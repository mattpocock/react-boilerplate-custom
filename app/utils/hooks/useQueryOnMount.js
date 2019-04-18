import useQuery from './useQuery';
import useComponentDidMount from './useComponentDidMount';

const useQueryOnMount = ({ endpoint, method, request = {} }) => {
  const query = useQuery({ endpoint, method });
  useComponentDidMount(() => {
    query.submit(request);
  });
  return query;
};

export default useQueryOnMount;
