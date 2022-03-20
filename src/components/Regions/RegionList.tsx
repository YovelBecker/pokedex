import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { IRegion } from '../../models/Region';

type RegionListProps = {
  regions: IRegion[],
  changeRegion: Function,
  currRegion: number | string,
}

export default function RegionList({ regions, changeRegion, currRegion }: RegionListProps) {
  const params = useParams();

  useEffect(() =>{
    changeRegion(params.regionId)
  }, [params, changeRegion])

  return (
    <div className="region-list-container">
      {regions.map(region => (
        <Link
          key={region.id}
          to={`/region/${region.regionId}`}
        >
          <div
            onClick={() => changeRegion(region.regionId)}
            className={`
          region-preview
          ${params.regionId && region.regionId === +params.regionId ? 'selected' : ''}
          `}
          >
            {region.name}
          </div>
        </Link>
      ))}
    </div>
  )
}
