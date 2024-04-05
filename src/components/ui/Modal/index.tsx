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
    <div className="w-full h-screen fixed top-0 bg-color-transparant flex justify-center items-center">
      <div
        className="min-w-1/3 min-h-1/3 bg-color-primary w-1/3 max-h-3/4 rounded-md p-5"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
