export async function getStaticProps(context) {
  const id = context.params.id;

  const res = await fetch(`https://swapi.dev/api/planets/${id}`);

  const data = await res.json();

  return {
    props: { data },
  };
}

// Generate all the different routes a head of time
export async function getStaticPaths() {
  const res = await fetch(`https://swapi.dev/api/planets/`);
  const data = await res.json();

  const paths = data.results.map((post) => {
    const urlArr = post.url.split('/');
    const id = urlArr[urlArr.length - 2];

    return {
      params: { id: id.toString() },
    };
  });

  return { paths, fallback: false };
}

const Planets = ({ data }) => {
  return (
    <div>
      <h1 className='text-center text-xl font-semibold my-6'>{`Planet ${data.name}`}</h1>
      <p>
        <span className='font-semibold'>Name: </span>
        {data.name.toUpperCase()}
      </p>
      <p>
        <span className='font-semibold'>Climate: </span>
        {data.climate.toUpperCase()}
      </p>
      <p>
        <span className='font-semibold'>Terrain: </span>
        {data.terrain.toUpperCase()}
      </p>
    </div>
  );
};

export default Planets;
