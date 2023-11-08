import Paper from '@mui/material/Paper';

export default function Card(props) {
  return (
    <Paper
      sx={{
        bgcolor: 'rgba(0, 137, 124, 0.5)', // Use bgcolor shorthand for background color
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        mb: 2, // margin-bottom shorthand, using theme's spacing multiplier
        p: 2, // padding shorthand, using theme's spacing multiplier
        color: 'white',
      }}
      {...props} // Allows the use of other props, such as onClick, etc.
    >
      {props.children}
    </Paper>
  );
}
