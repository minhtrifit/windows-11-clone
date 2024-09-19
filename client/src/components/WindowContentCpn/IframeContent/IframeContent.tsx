interface PropType {
  url: string | undefined;
}

const IframeContent = (props: PropType) => {
  const { url } = props;

  return (
    <div className="w-full h-full flex items-center justify-center">
      {!url ? (
        <span className="text-2xl font-bold">URL not found :(</span>
      ) : (
        <iframe className="w-full h-full rounded-b-md" src={url} />
      )}
    </div>
  );
};

export default IframeContent;
