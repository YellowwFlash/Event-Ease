import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ login, user }) => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = login;
    const { setCurrentUser } = user;

    useEffect(() => {
        // Perform the logout operations
        setIsLoggedIn(false);
        setCurrentUser(null);

        // Clear localStorage if you’re using persistence
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');

        // Navigate back to the homepage after logout
        setTimeout(() => navigate('/'), 1200)
    }, [navigate, setIsLoggedIn, setCurrentUser]);

    // Return an empty fragment or a loading state if necessary
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    );
};

export default Logout;
