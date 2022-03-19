import React from 'react'
import { IRegion } from '../../models/Region';

type RegionListProps = {
  regions: IRegion[],
  changeRegion: Function,
  currRegion: number | string,
}

export default function RegionList({ regions, changeRegion, currRegion }: RegionListProps) {
  return (
    <div className="region-list-container">
      {regions.map(region => (
        <div
          key={region.id}
          onClick={() => changeRegion(region.regionId)}
          className={`
          region-preview
          ${region.regionId === currRegion ? 'selected' : ''}
        `}
        >
          {region.name}
        </div>
      ))}
    </div>
  )
}
