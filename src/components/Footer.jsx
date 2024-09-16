import React from 'react';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoMdCall } from "react-icons/io";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-4 md:px-32 font-expletus-sans border-t border-t-arcane-primary">
        <div className="mx-auto flex md:flex-row flex-col items-center justify-between w-full">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="logo" className="h-[70px]" />
            </div>
            <div className="flex space-x-4 mt-8">
              <a href="https://www.instagram.com/arcane_2k24/" target='blank' className="text-gray-500 hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/school/crescentinstitute/" target='blank' className="text-gray-500 hover:text-white">
                <FaLinkedinIn className="h-6 w-6" />
              </a>
              <a href="https://x.com/bsacrescentinst" target='blank' className="text-gray-500 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/c/BSACrescentInstitute" target='blank' className="text-gray-500 hover:text-white">
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="flex w-full flex-wrap mt-14 md:mt-[unset] items-center justify-center md:justify-end gap-10 md:gap-20">
            <div>
              <h3 className="font-bold text-lg text-arcane-primary">Overview</h3>
              <ul className="text-gray-400 space-y-1">
                <li>
                  <a href="/" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-white">
                    Events
                  </a>
                </li>
                <li>
                  <a href="/clubs" className="hover:text-white">
                    Clubs
                  </a>
                </li>
                <li>
                  <a href="/register" className="hover:text-white">
                    Register
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-arcane-primary">
                Department
              </h3>
              <ul className="text-gray-400 space-y-1">
                <li>
                  <a href="https://crescent.education/university/schools/school-of-computer-information-and-mathematical-sciences/department-of-computer-science-and-engineering/overview/" target='blank' className="hover:text-white">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="https://crescent.education/university/schools/school-of-computer-information-and-mathematical-sciences/department-of-computer-science-and-engineering/students-achievements/" target='blank' className="hover:text-white">
                    Achievements
                  </a>
                </li>
                <li>
                  <a href="https://crescent.education/university/schools/school-of-computer-information-and-mathematical-sciences/department-of-computer-science-and-engineering/alumni-feedback/" target='blank' className="hover:text-white">
                    Alumni
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/cse.bsau/" target='blank' className="hover:text-white">
                    Socials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-arcane-primary">
                Contact
              </h3>
              <ul className="text-gray-400 space-y-1">
                <li>
                  <a href="mailto:" target='blank' className="hover:text-white flex items-center gap-1">
                    <IoMail />
                    arcane@crescent.education
                  </a>
                </li>
                <li>
                  <a href="tel:+919025681651" className="hover:text-white flex items-center gap-1">
                    <IoMdCall />
                    Mohanraj
                  </a>
                </li>
                <li>
                  <a href="tel:+919629327633" className="hover:text-white flex items-center gap-1">
                    <IoMdCall />
                    Saif Z
                  </a>
                </li>
                <li>
                  <a href="tel:+918220121649" className="hover:text-white flex items-center gap-1">
                    <IoMdCall />
                    Samir
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 text-center text-gray-500">
          <p>B. S. Abdur Rahman Crescent Institute of Science and Technology</p>
        </div>
      </footer>
  )
}

export default Footer;