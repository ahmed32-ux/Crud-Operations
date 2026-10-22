
function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Logo
        </h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6">
          <li>
            <a href="/" className="hover:text-blue-400 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#products" className="hover:text-blue-400 transition">
              Products
            </a>
          </li>

          <li>
            <a href="#add-product" className="hover:text-blue-400 transition">
              Add Product
            </a>
          </li>
        </ul>

        {/* Button */}
        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition">
          Get Started
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
