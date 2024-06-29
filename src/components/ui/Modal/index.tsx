import { useEffect, useRef } from 'react';

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: any }) => {
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.addEventListener('mousedown', handleClickOutSide);
    };
  }, [onClose]);

  return (
    <div className="w-full h-screen fixed top-0 bg-color-transparant flex justify-center items-center overflow-auto z-40">
      <div
        className="lg:min-w-[30%] md:min-w-[50%] sm:min-w-[70%] min-w-[70%] min-h-1/3 bg-color-primary max-h-3/4 rounded-md p-5 my-auto"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
