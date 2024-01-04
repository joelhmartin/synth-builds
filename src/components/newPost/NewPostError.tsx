interface Props {
  errorMessage: string | null;
  onClick: () => void;
}

const NewPostError = ({ errorMessage, onClick }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-lg font-bold">Something went wrong</p>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={onClick}
      >
        Try Again
      </button>
    </div>
  );
};

export default NewPostError;

