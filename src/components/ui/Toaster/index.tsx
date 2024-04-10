type PropTypes = {
  variant: string;
  message: string;
};

const toasterVariant: any = {
  success: {
    title: 'Success',
    icon: 'bxs-check-circle',
    colorBar: 'bg-color-green',
  },
  error: {
    title: 'Error',
    icon: 'bxs-x-circle',
    colorBar: 'bg-color-red',
  },
};

const Toaster = (props: PropTypes) => {
  const { variant, message } = props;
  return (
    <div className="w-full h-screen fixed flex justify-end items-end bottom-5 right-5">
      <div className="fixed min-w-72 min-h-24 flex justify-start items-center gap-3 rounded-md shadow-xl px-5 py-3">
        <div className="absolute top-4 right-4">
          <i className="bx bx-x-circle text-xl font-semibold"></i>
        </div>
        <div>
          <i className={`bx ${toasterVariant['success'].icon} text-4xl text-color-green`}></i>
        </div>
        <div>
          <p className="font-bold text-lg">{toasterVariant['success'].title}</p>
          <p className="text-sm">Success Update Profile</p>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-2 bg-color-white">
          <div className={`w-full h-2 ${toasterVariant['success'].colorBar}`} />
        </div>
      </div>
    </div>
  );
};

export default Toaster;
