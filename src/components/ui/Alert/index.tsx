type PropTypes = {
  message: string;
  type: any;
};

const AlertUi = (props: PropTypes) => {
  const { message, type } = props;
  return (
    <>
      {type === 'error' ? (
        <div className="flex gap-3 text-color-primary font-semibold items-center w-54 bg-color-red h-10 justify-center rounded">
          <i className="bx bxs-error-circle text-2xl"></i>
          <h3>{message}</h3>
        </div>
      ) : (
        <div className="flex gap-3 text-color-primary font-semibold items-center w-54 bg-color-blue h-10 justify-center rounded">
          <i className="bx bxs-check-circle text-2xl"></i>
          <h3>{message}</h3>
        </div>
      )}
    </>
  );
};

export default AlertUi;
