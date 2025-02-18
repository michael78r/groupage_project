import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function ActiveLastBreadcrumb({ breadcrumbs }) {
  const handleClick = (label, href) => {

  };

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map(({ label, href }, index) => (
          <Link
            key={index}
            underline="hover"
            color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
            href={href}
            onClick={(event) => {
              event.preventDefault();
              handleClick(label, href);
            }}
          >
            {label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
