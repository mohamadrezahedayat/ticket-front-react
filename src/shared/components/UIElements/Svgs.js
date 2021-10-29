import React from 'react';

export const HomeIcon = () => {
  return (
    <svg id='icon-home' viewBox='0 0 20 20'>
      <path d='M18.672 11h-1.672v6c0 0.445-0.194 1-1 1h-4v-6h-4v6h-4c-0.806 0-1-0.555-1-1v-6h-1.672c-0.598 0-0.47-0.324-0.060-0.748l8.024-8.032c0.195-0.202 0.451-0.302 0.708-0.312 0.257 0.010 0.513 0.109 0.708 0.312l8.023 8.031c0.411 0.425 0.539 0.749-0.059 0.749z'></path>
    </svg>
  );
};

export const UserIcon = () => {
  return (
    <svg id='icon-user' viewBox='0 0 20 20'>
      <path d='M7.725 2.146c-1.016 0.756-1.289 1.953-1.239 2.59 0.064 0.779 0.222 1.793 0.222 1.793s-0.313 0.17-0.313 0.854c0.109 1.717 0.683 0.976 0.801 1.729 0.284 1.814 0.933 1.491 0.933 2.481 0 1.649-0.68 2.42-2.803 3.334-2.13 0.918-4.326 2.073-4.326 4.073v1h18v-1c0-2-2.197-3.155-4.328-4.072-2.123-0.914-2.801-1.684-2.801-3.334 0-0.99 0.647-0.667 0.932-2.481 0.119-0.753 0.692-0.012 0.803-1.729 0-0.684-0.314-0.854-0.314-0.854s0.158-1.014 0.221-1.793c0.065-0.817-0.398-2.561-2.3-3.096-0.333-0.34-0.558-0.881 0.466-1.424-2.24-0.105-2.761 1.067-3.954 1.929z'></path>
    </svg>
  );
};

export const ZoomIn = ({ onZoomIn, className }) => {
  return (
    <svg
      className={className}
      cursor='zoom-in'
      id='icon-zoom-in'
      viewBox='0 0 32 32'
      onClick={onZoomIn}
    >
      <path d='M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM14 6h-4v4h-4v4h4v4h4v-4h4v-4h-4z'></path>
    </svg>
  );
};

export const ZoomOut = ({ onZoomOut, className }) => {
  return (
    <svg
      className={className}
      cursor='zoom-out'
      id='icon-zoom-out'
      viewBox='0 0 32 32'
      onClick={onZoomOut}
    >
      <path d='M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM6 10h12v4h-12z'></path>
    </svg>
  );
};

export const Reset = ({ onReset, className }) => {
  return (
    <svg
      className={className}
      id='icon-cycle'
      viewBox='0 0 20 20'
      cursor='pointer'
      onClick={onReset}
    >
      <path d='M5.516 14.224c-2.262-2.432-2.222-6.244 0.128-8.611 0.962-0.969 2.164-1.547 3.414-1.736l-0.069-2.077c-1.755 0.213-3.452 0.996-4.797 2.351-3.149 3.17-3.187 8.289-0.123 11.531l-1.741 1.752 5.51 0.301-0.015-5.834-2.307 2.323zM12.163 2.265l0.015 5.834 2.307-2.322c2.262 2.434 2.222 6.246-0.128 8.611-0.961 0.969-2.164 1.547-3.414 1.736l0.069 2.076c1.755-0.213 3.452-0.996 4.798-2.35 3.148-3.172 3.186-8.291 0.122-11.531l1.741-1.754-5.51-0.3z'></path>
    </svg>
  );
};

export const Arrow = ({ className, onClick }) => {
  return (
    <svg
      id='icon-chevron-up'
      className={className}
      onClick={onClick}
      viewBox='0 0 20 20'
    >
      <path d='M15.484 12.452c-0.436 0.446-1.043 0.481-1.576 0l-3.908-3.747-3.908 3.747c-0.533 0.481-1.141 0.446-1.574 0-0.436-0.445-0.408-1.197 0-1.615 0.406-0.418 4.695-4.502 4.695-4.502 0.217-0.223 0.502-0.335 0.787-0.335s0.57 0.112 0.789 0.335c0 0 4.287 4.084 4.695 4.502s0.436 1.17 0 1.615z'></path>
    </svg>
  );
};

export const DeleteIcon = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      id='icon-trash'
      viewBox='0 0 25 25'
      fill='#df3c3c'
      width='25px'
      height='25px'
    >
      <path d='M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z'></path>
    </svg>
  );
};

export const AddAgainIcon = ({ className, onClick, addBtnColor }) => {
  return (
    <svg
      cursor='cell'
      id='icon-circle-with-plus'
      viewBox='0 0 25 25'
      onClick={onClick}
      fill={addBtnColor}
    >
      <path d='M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM15 11h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z'></path>
    </svg>
  );
};

export const PieChart = ({ className, percent }) => {
  return (
    <svg id='expiration' viewBox='0 0 20 20'>
      <circle r='10' cx='10' cy='10' fill='tomato' />
      <circle
        r='5'
        cx='10'
        cy='10'
        stroke='green'
        strokeWidth='10'
        fill='transparent'
        strokeDasharray={`${percent} 31.4`}
      />
    </svg>
  );
};

export const Edit = ({ className, onClick }) => (
  <svg
    className={className}
    onClick={onClick}
    id='icon-pencil'
    viewBox='0 0 20 20'
  >
    <path d='M14.69 2.661c-1.894-1.379-3.242-1.349-3.754-1.266-0.144 0.023-0.265 0.106-0.35 0.223l-6.883 9.497c-0.277 0.382-0.437 0.836-0.462 1.307l-0.296 5.624c-0.021 0.405 0.382 0.698 0.76 0.553l5.256-2.010c0.443-0.17 0.828-0.465 1.106-0.849l6.88-9.494c0.089-0.123 0.125-0.273 0.1-0.423-0.084-0.526-0.487-1.802-2.357-3.162zM8.977 15.465l-2.043 0.789c-0.080 0.031-0.169 0.006-0.221-0.062-0.263-0.335-0.576-0.667-1.075-1.030-0.499-0.362-0.911-0.558-1.31-0.706-0.080-0.030-0.131-0.106-0.126-0.192l0.122-2.186 0.549-0.755c0 0 1.229-0.169 2.833 0.998 1.602 1.166 1.821 2.388 1.821 2.388l-0.55 0.756z'></path>
  </svg>
);

export const SeatSvg = ({ className, onClick }) => (
  <svg
    id='icon-event_seat'
    className={className}
    onClick={onClick}
    viewBox='0 0 24 24'
  >
    <path d='M17.016 12.984h-10.031v-7.969q0-0.797 0.609-1.406t1.406-0.609h6q0.797 0 1.406 0.609t0.609 1.406v7.969zM2.016 9.984h3v3h-3v-3zM18.984 9.984h3v3h-3v-3zM3.984 21v-6h16.031v6h-3v-3h-10.031v3h-3z'></path>
  </svg>
);

export const ViewIcon = ({ className, onClick }) => (
  <svg
    id='icon-eye'
    viewBox='0 0 20 20'
    className={className}
    onClick={onClick}
  >
    <path d='M10 4.4c-6.561 0-10 4.832-10 5.6 0 0.766 3.439 5.6 10 5.6s10-4.834 10-5.6c0-0.768-3.44-5.6-10-5.6zM10 14.307c-2.455 0-4.445-1.928-4.445-4.307s1.99-4.309 4.445-4.309c2.455 0 4.444 1.93 4.444 4.309s-1.989 4.307-4.444 4.307zM10 10c-0.407-0.447 0.663-2.154 0-2.154-1.228 0-2.223 0.965-2.223 2.154s0.995 2.154 2.223 2.154c1.227 0 2.223-0.965 2.223-2.154 0-0.547-1.877 0.379-2.223 0z'></path>
  </svg>
);

export const SaveIcon = ({ className, onClick }) => (
  <svg
    id='icon-floppy-disk'
    viewBox='0 0 32 32'
    className={className}
    onClick={onClick}
  >
    <path d='M28 0h-28v32h32v-28l-4-4zM16 4h4v8h-4v-8zM28 28h-24v-24h2v10h18v-10h2.343l1.657 1.657v22.343z'></path>
  </svg>
);
