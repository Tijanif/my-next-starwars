import Link from 'next/link';

// data fetching at build time
export async function getStaticProps(context) {
  const res = await fetch(`https://swapi.dev/api/planets/`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}

const Planets = ({ data }) => {
  return (
    <div>
      <h1 className='text-center text-xl font-semibold my-6'>Planets</h1>
      <div className='flex flex-wrap justify-center'>
        {data.results.map((planet) => {
          const urlArr = planet.url.split('/');
          const id = urlArr[urlArr.length - 2];
          return (
            <div className='mx-2 mb-2 bg-gray-700 py-2 px-4 rounded-md text-white'>
              <Link href={`/planets${id}`}>{planet.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Planets;
