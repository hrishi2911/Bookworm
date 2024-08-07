import { useDispatch } from 'react-redux';
import { deleteItem } from '../Cart/cartSlice';
import Button from '../../ui/Button';

function DeleteProduct({ productId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(productId))}>
      Delete
    </Button>
  );
}

export default DeleteProduct;