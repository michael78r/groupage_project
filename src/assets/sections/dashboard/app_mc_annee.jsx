import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import { Badge } from '@mui/material';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import React from 'react';

// ----------------------------------------------------------------------

export default function MeilleurClientAnnee({ title, subheader, list, ...other }) {

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
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
          <OrderItem index={index} item={item} />
        ))}
      </Timeline>
    </Card>
  );
}

MeilleurClientAnnee.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

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

OrderItem.propTypes = {
  item: PropTypes.object
};
