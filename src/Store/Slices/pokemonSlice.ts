import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

interface PokemonState {
  allPokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  offset: number; // To keep track of current offset for pagination
  hasMore: boolean; // To determine if more Pokémon are available to fetch
}

const initialState: PokemonState = {
  allPokemons: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  offset: 0, // Start from the beginning
  hasMore: true, // Assume there are more Pokémon to fetch initially
};

// Define the number of Pokémon to fetch per batch
const LIMIT = 20;

// Async Thunks

/**
 * Fetch a batch of Pokémon with pagination support.
 * @param {object} params - Contains the offset and limit for fetching Pokémon.
 * @returns {Pokemon[]} - An array of detailed Pokémon data.
 */
export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async ({ offset, limit }: { offset: number; limit: number }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    const detailedPokemons: Pokemon[] = await Promise.all(
      data.results.map(async (pokemon: { url: string }) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    return { pokemons: detailedPokemons, count: data.count };
  }
);

/**
 * Fetch detailed data for a specific Pokémon by ID.
 * @param {string} id - The unique ID of the Pokémon.
 * @returns {Pokemon} - The detailed Pokémon data.
 */
export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (id: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    return response.json();
  }
);

// Slice

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    /**
     * Reset the Pokémon list and pagination states.
     * Useful when performing a new search or resetting the app.
     */
    resetPokemons: (state) => {
      state.allPokemons = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchPokemons lifecycle
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemons.fulfilled,
        (state, action: PayloadAction<{ pokemons: Pokemon[]; count: number }>) => {
          state.loading = false;
          state.allPokemons = [...state.allPokemons, ...action.payload.pokemons];
          state.offset += LIMIT;
          // Determine if there are more Pokémon to fetch
          if (state.allPokemons.length >= action.payload.count) {
            state.hasMore = false;
          }
        }
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokémon';
      });

    // Handle fetchPokemonById lifecycle
    builder
      .addCase(fetchPokemonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemonById.fulfilled,
        (state, action: PayloadAction<Pokemon>) => {
          state.loading = false;
          state.selectedPokemon = action.payload;
        }
      )
      .addCase(fetchPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokémon';
      });
  },
});

// Export actions and reducer
export const { resetPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
