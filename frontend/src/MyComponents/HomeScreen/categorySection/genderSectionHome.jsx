const GenderSectionHome = ({ data }) => {
  return (
    <>
      <div className="flex gap-2">
        {data.category_1.map((item, index) => (
          <a key={index} href={item.href}>
            <img
              src={item.image}
              alt={item.alt}
              className="w-full"
            />
          </a>
        ))}
      </div>
      <div className="flex gap-1 mt-1">
        {data.category_2.map((item, index) => (
          <a key={index} href={item.href}>
            <img
              src={item.image}
              alt={item.alt}
              className="w-full"
            />
          </a>
        ))}
      </div>
    </>
  );
}

export default GenderSectionHome;
