const useGetUserName = () =>{
    return window.localStorage.getItem("username");
}

export default useGetUserName;