import { Bounce, toast } from 'react-toastify';

const defaultToastConfig = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const showSuccessNotification = (message) => {
  toast.success(message, defaultToastConfig);
};

export const showErrorNotification = (message) => {
  toast.error(message, defaultToastConfig);
};
