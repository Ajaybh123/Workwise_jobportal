import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h5 className="text-lg font-bold mb-4">About <span className='text-[#ed3a08]'>Work</span>Wise</h5>
              <p>
                JobPortal connects job seekers with employers. Explore thousands of job opportunities and grow your career.
              </p>
            </div>

            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h5 className="text-lg font-bold mb-4">Useful Links</h5>
              <ul>
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>

            <div className="w-full md:w-1/3">
              <h5 className="text-lg font-bold mb-4">Newsletter & Social Media</h5>
              <p className="mb-4">Subscribe to our newsletter for updates.</p>

              <form className="mb-6">
                <div className="flex items-center">
                  <input type="email" placeholder="Your email address" className="w-full p-2 rounded-l bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none" />
                  <button type="submit" className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-r">Subscribe</button>
                </div>
              </form>

              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.56v14.88C24 21.72 23.28 22 22.56 22H1.44C.72 22 0 21.72 0 19.44V4.56C0 2.28.72 2 1.44 2h21.12C23.28 2 24 2.28 24 4.56zM8.59 19.06v-6.9H6.32v6.9H8.6zm-1.14-7.91h-.02c-.77 0-1.27-.53-1.27-1.2 0-.68.51-1.2 1.29-1.2.77 0 1.26.52 1.27 1.2-.01.67-.51 1.2-1.27 1.2zM19 19.06h-2.29v-3.58c0-.86-.31-1.45-1.09-1.45-.6 0-.96.4-1.12.79-.06.15-.08.36-.08.57v3.67H12v-6.9h2.2v.94h.03c.29-.43.79-1.05 1.92-1.05 1.4 0 2.45.91 2.45 2.86v4.15z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.45-9.96 9.96 0 4.41 3.69 8.09 8.29 9.41v-6.65H8.69v-2.77h2.63V9.83c0-2.6 1.54-4.04 3.91-4.04 1.13 0 2.32.19 2.32.19v2.58h-1.31c-1.3 0-1.71.81-1.71 1.63v1.94h2.89l-.46 2.77h-2.43v6.65c4.6-1.32 8.29-5 8.29-9.41 0-5.51-4.46-9.96-9.96-9.96z" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.94 4.56v14.88C23.94 21.72 23.22 22 22.5 22H1.5C.78 22 0 21.72 0 19.44V4.56C0 2.28.78 2 1.5 2h21c.72 0 1.44.28 1.44 2.56zm-4.65 10.66v-1.2c.01-.85-.55-1.69-1.36-1.79-.43-.05-.78.13-1.12.43-.38.36-.57.91-.57 1.49v1.07c.02.55.38 1.01.85 1.24.27.12.58.17.86.1.82-.2 1.36-.95 1.36-1.83zM16 9.05c.92 0 1.68.78 1.68 1.73S16.92 12.5 16 12.5c-.92 0-1.68-.78-1.68-1.73S15.08 9.05 16 9.05zm5.59 7.43H18.4c-.74.13-1.48.11-2.2-.06-.62-.16-1.1-.63-1.34-1.22-.25-.61-.22-1.32.09-1.9.25-.47.65-.86 1.14-1.11.55-.28 1.2-.4 1.84-.34.88.08 1.71.49 2.29 1.13.37.41.68.91.87 1.46.07.18.11.38.14.58.03.26.04.51.04.76-.01.41-.1.83-.3 1.21-.23.46-.55.87-1 .98zm-4.4-.13h-.2v.04h.2z" /></svg>
                </a>
              </div>
            </div>
          </div>

          <hr className="border-gray-700 my-8" />

          <div className="text-center">
            <p>&copy; 2024 WorkWise. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
