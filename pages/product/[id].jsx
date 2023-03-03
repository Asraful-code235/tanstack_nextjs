import { addItem } from '@/app/cart/cartSlice';
import {
  QueryClient,
  dehydrate,
  useQueries,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

async function getProductDetails(id) {
  if (!id) return null;
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
}

const ProductDetails = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const queryClient = new QueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ProductDetails', id],
    queryFn: () => getProductDetails(id),
    keepPreviousData: true,
    initialData: props.dehydrateState,
  });

  const handleAddToCart = () => {
    dispatch(addItem(data));
    // queryClient.invalidateQueries('cart')
  };

  if (isLoading && !data) {
    return 'Loading...';
  }

  return (
    <section className="w-5/6 mx-auto py-[3vmax]">
      <button onClick={() => router.back()}>Go Back</button>
      <section className="grid grid-cols-1 md:grid-cols-6">
        <div className="col-span-1 md:col-span-4 flex">
          <Image
            src={data.thumbnail || '/favicon.ico'}
            alt={data.title || 'product_image'}
            width={600}
            height={600}
            priority
            className="object-cover object-center "
          />
          <div className="p-[2vmax]">
            <h1 className="font-semibold text-xl capitalize">{data.title}</h1>
            <p>{data.description}</p>
            <p>{data.stock}</p>
          </div>
        </div>
        <div className="border h-min text-center bg-slate-100">
          <button onClick={handleAddToCart} className="p-[1vmax]">
            Add to cart
          </button>
        </div>
      </section>
    </section>
  );
};

export default ProductDetails;

export async function getServerSideProps({ params }) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['ProductDetails', id],
    queryFn: () => getProductDetails(id),
  });
  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  };
}
