import { QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { hydrate } from '@tanstack/react-query';
import useDebounced from './hooks/useDebounced';
import Link from 'next/link';
async function getSearch(title) {
  const res = await axios.get(
    `https://dummyjson.com/products/search?q=${title}`
  );
  return res.data;
}

const Search = ({ setIsFilter }) => {
  const [title, setTitle] = useState('');
  const debouncedSearchTerm = useDebounced(title, 200);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: () => getSearch(debouncedSearchTerm),
  });

  return (
    <div className="text-center mt-8 ">
      <input
        type="search"
        placeholder="Search..."
        onChange={(e) => setTitle(e.target.value)}
        className="border px-[0.2vmax] py-[0.4vmax] rounded-lg"
      />
      <button
        className="bg-gray-500 px-[0.4vmax] py-[0.4vmax] text-white"
        type="submit"
      >
        Search
      </button>

      {data?.products.length > 0 && title.length > 0 && (
        <div className="flex max-w-[60%] mx-auto flex-col divide-y divide-slate-200 justify-start items-start gap-2">
          {data?.products.map((product) => {
            return (
              <Link
                className="p-[1vmax_0] "
                href={`/product/${product.id}`}
                key={product.title}
              >
                {product.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;

// export async function getServerSideProps() {
//   const queryClient = new QueryClient();
//   queryClient.prefetchQuery({
//     queryKey: ['search'],
//     queryFn: () => getSearch,
//   });

//   return {
//     props: {
//       dehydratedState: hydrate(queryClient),
//     },
//   };
// }
