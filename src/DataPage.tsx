import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { City, Alternative, DataLink } from 'Types';
import cities from 'cities.json';
import alternatives from 'alternatives.json';

// -------------------------------------------------------- //
//                          Helpers                         //
// -------------------------------------------------------- //

const otherData = alternatives.filter(a => !a.salary);

// -------------------------------------------------------- //
//                       Main Component                     //
// -------------------------------------------------------- //


export const DataPage = () => (
  <div>
    <CitySection />
    <OtherDataSection />
  </div>
)


// -------------------------------------------------------- //
//                    City Budget Components                //
// -------------------------------------------------------- //

const CitySection = () => (
  <div>
    <h1>City Budgets</h1>
    {cities.map(city => <CityData city={city} />)}
  </div>
)

interface CityDataProps {
  city: City
}

const CityData = ({city}: CityDataProps) => (
  <div>
    <h2>{city.name}</h2>
    <h3>Links</h3>
    <div>{city.links.map(link => <LinkDisplay link={link} />)}</div>
    <h3>Notes</h3>
    <div>{city.notes.map(note => <p>{note}</p>)}</div>
  </div>
)

interface LinkDisplayProps {
  link: DataLink
}

const LinkDisplay = ({link}: LinkDisplayProps) => (
  <a href={link.url}>{link.linkText}</a>
)

// -------------------------------------------------------- //
//                     Other Data Components                //
// -------------------------------------------------------- //

const OtherDataSection = () => (
  <div>
    <h1>Other Data</h1>
    {otherData.map(alt => <AlternativeData alternative={alt} />)}
  </div>
)

interface AnternativeDataProps {
  alternative: Alternative
}

const AlternativeData = ({alternative}: AnternativeDataProps) => (
  <div>
    <h2>{alternative.name}</h2>
    {
      alternative.links &&
      <React.Fragment>
        <h3>Links</h3>
        <div>{alternative.links.map(link => <LinkDisplay link={link} />)}</div>
      </React.Fragment>
    }
    {
      alternative.notes &&
      <React.Fragment>
        <h3>Notes</h3>
        <div>{alternative.notes.map(note => <p>{note}</p>)}</div>
      </React.Fragment>
    }
  </div>
)

// -------------------------------------------------------- //
//                           Styles                         //
// -------------------------------------------------------- //