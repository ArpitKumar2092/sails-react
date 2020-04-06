import { toast } from 'react-toastify';

toast.configure({
    autoClose: 8000,
    draggable: false,
    //etc you get the idea
  });

const Error = (message) => {
    toast.error(message);
}

const Success = (message) => {
    toast.success(message);
}

export { Error , Success };