import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "../../utils/cn";

import Signup from '../../SignUp'; // Import the Signup component from the SignUp.js file
import Signin from '../../SignIn';
import InstructorPage from '../../instructorPage'; // Import InstructorPage
import StudentPage from '../../studentPage';
import EvaluationForm from '../../evaluationForm';


export function NavbarDemo() {

  
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
return (
    <div
        className={cn(
            "fixed top-0 inset-x-0 max-w-2xl mx-auto z-50 dark py-4 ",
            className
        )}
    >
        <Menu setActive={setActive}>
            <MenuItem setActive={setActive} href="/Home" item="Home" >
             
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="About">
             
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Account">
                
            </MenuItem>
        </Menu>
    </div>
);
}
