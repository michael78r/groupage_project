import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import { Badge } from '@mui/material';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { fDateTime } from '../../utils/format-time';
import Iconify from '../../components/iconify/iconify';

// ----------------------------------------------------------------------

export default function MeilleurClientDuMois({ title, subheader, list, ...other }) {

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {/* <OutlinedInput
        // value={filterName}
        // onChange={onFilterName}
        placeholder="rechercher..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: 'text.disabled', width: 10, height: 10 }}
            />
          </InputAdornment>
        }
      /> */}
      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <OrderItem key={index} index={index} item={item} />
        ))}
      </Timeline>
    </Card>
  );
}

// MeilleurClientDuMois.propTypes = {
//   list: PropTypes.array,
//   subheader: PropTypes.string,
//   title: PropTypes.string,
// };

// ----------------------------------------------------------------------

function OrderItem({ index, item }) {
  const numero = index + 1;
  const { nom, prenom, total_cbm } = item;
  return (
    <TimelineItem>
      {/* <TimelineSeparator> */}

      <Badge sx={{ marginRight: 1, marginTop: 2 }}
        badgeContent={numero}
        color={
          (numero === 1 && 'primary') ||
          (numero === 2 && 'error') ||
          (numero === 3 && 'success') ||
          'dark'
        }
      />
      {/* {lastTimeline ? null : <TimelineConnector />} */}
      {/* </TimelineSeparator> */}

      <TimelineContent>
        <Typography variant="subtitle2">{nom} {prenom}</Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          cbm: {total_cbm} m³
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

// OrderItem.propTypes = {
//   item: PropTypes.object
// };
