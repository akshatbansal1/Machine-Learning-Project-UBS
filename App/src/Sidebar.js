import React , { useState }from 'react';
import './AppJ.css';
import { Link } from 'react-router-dom';
import {SidebarData} from './SidebarData';
import logo from './img/Logo1.png';
import searchbar from './img/Quicksearch.png';
import SearchBar from './searchbar';


function Sidebar() {
  function handleChange(e) {
    console.log(e.target.value);
  }
  return (
    <div className="Sidebar">
      <img src={logo}  alt="UBS logo" className="logo" onClick={() => {
        window.location.pathname = "/"
      }} />
      <ul className="SidebarList">
      {SidebarData.map((val,key)=> {
        return <li 
        key={key} 
        className="row"
        id={window.location.pathname == val.link ? "active": ""}
        onClick={()=> {
          window.location.pathname = val.link;
          }}
          > 
        <div id="icon">{val.icon}</div>
        <div id="title">{val.title}</div>
        </li>
      })}
      </ul> 
    </div>
  );
}

export default Sidebar;
