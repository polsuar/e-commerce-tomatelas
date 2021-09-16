

const AdminUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers())
  }, []);


  // trae lo del estado
  const users = useSelector((state) => state.userlist);

  const handleChange = (userId) => {
    dispatch(promoteAdmin( userId ));
  };


  return (
    <>
   <h1>hola</h1>
    </>
  );
};

export default AdminUsers;