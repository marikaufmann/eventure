const NoEventsFound = () => {
  return (
    <div className="pt-32">
      <div className="font-medium flex flex-col gap-4 mx-auto items-center justify-center ">
        <h1 className=" laptop:text-2xl text-lg ">
          We couldn't find any events that match your selected criteria.
        </h1>
        <p className="text-lg laptop:text-xl text-gray-600 ">
          Please adjust your filters to discover available events.
        </p>
      </div>
    </div>
  );
};

export default NoEventsFound;
