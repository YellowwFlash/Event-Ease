import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";


const Navbar = ({ login, user }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isLoggedIn } = login;
  const { currentUser } = user;

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-9 w-9 mr-2" src={logo} alt="Logo" />
            <span className="text-2xl"><a href="/" className="bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 text-transparent bg-clip-text">EventEase</a></span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12 text-lg">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-purple-500 transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-7 items-center">
            {!isLoggedIn ?
              (<>
                <a href="/login" login={login} user={user} className="py-2 px-3 border rounded-md  hover:bg-gray-100 border-gray-700">
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-purple-400 py-2 px-3 rounded-md transition-colors duration-300 hover:bg-purple-500 border border-black"
                >
                  Create an account
                </a>
              </>) : (<><a href="/logout" className="py-2 px-3 border rounded-md  hover:bg-gray-100 border-gray-700">
                Logout
              </a>
                <p
                  className="bg-purple-400 py-2 px-3 rounded-md transition-colors duration-300 hover:bg-purple-500 border border-black"
                >
                  Welcome
                </p>
              </>)}
          </div>

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href} className="text-gray-700 hover:text-purple-500 transition-colors duration-300"
                  >{item.label}</a>

                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              {!isLoggedIn ?
                (<>
                  <a href="/login" className="py-2 px-3 border rounded-md  hover:bg-gray-100 border-gray-700">
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="bg-purple-400 py-2 px-3 rounded-md transition-colors duration-300 hover:bg-purple-500 border border-black"
                  >
                    Create an account
                  </a>
                </>) : (<><a href="/logout" className="py-2 px-3 border rounded-md  hover:bg-gray-100 border-gray-700">
                  Logout
                </a>
                  <p
                    className="bg-purple-400 py-2 px-3 rounded-md transition-colors duration-300 hover:bg-purple-500 border border-black"
                  >
                    Welcome
                  </p>
                </>)}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
