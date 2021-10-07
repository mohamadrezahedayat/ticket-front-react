import React, { useEffect, useState } from 'react';

import { H } from '../../shared/styledComponent/Typography';
import { Colors } from '../../shared/styledComponent/functions';
import Div from '../../shared/styledComponent/Div';

const ReservedTicket = ({ price, code, width }) => {
  // eslint-disable-next-line no-unused-vars
  const [panelWidth, setpanelWidth] = useState(width);

  useEffect(() => {
    setpanelWidth(width);
  }, [width]);
  return (
    <Div column>
      <svg
        // width='200'
        // height='56'
        viewBox='0 0 200 56'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M100 8C104.418 8 108 4.41828 108 0H192C192 4.41828 195.582 8 200 8V48C195.582 48 192 51.5817 192 56H108C108 51.5817 104.418 48 100 48V8Z'
          fill='#54005B'
          fillOpacity='0.6'
        />
        <path d='M100 8V47.5' stroke='black' strokeDasharray='4 3' />
        <mask id='path-3-inside-1' fill='white'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M103 10.1429C107.153 10.1429 110.52 6.94489 110.52 3H189.48C189.48 6.94489 192.847 10.1429 197 10.1429V45.8571C192.847 45.8571 189.48 49.0551 189.48 53H110.52C110.52 49.0551 107.153 45.8571 103 45.8571V10.1429Z'
          />
        </mask>
        <path
          d='M110.52 3V2.5L110.02 3H110.52ZM103 10.1429V9.64286L102.5 10.1429H103ZM189.48 3H189.98L189.48 2.5V3ZM197 10.1429H197.5L197 9.64286V10.1429ZM197 45.8571V46.3571L197.5 45.8571H197ZM189.48 53V53.5L189.98 53H189.48ZM110.52 53H110.02L110.52 53.5V53ZM103 45.8571H102.5L103 46.3571V45.8571ZM110.02 3C110.02 3.54665 109.95 4.07727 109.819 4.58465L110.787 4.83504C110.939 4.24676 111.02 3.63204 111.02 3H110.02ZM108.95 6.52661C108.363 7.41136 107.56 8.15786 106.61 8.69835L107.104 9.56764C108.188 8.95148 109.108 8.09779 109.783 7.07947L108.95 6.52661ZM104.607 9.46815C104.091 9.58234 103.553 9.64286 103 9.64286V10.6429C103.626 10.6429 104.237 10.5743 104.823 10.4445L104.607 9.46815ZM102.5 10.1429V11.6735H103.5V10.1429H102.5ZM102.5 13.7143V16.7755H103.5V13.7143H102.5ZM102.5 18.8163V21.8776H103.5V18.8163H102.5ZM102.5 23.9184V26.9796H103.5V23.9184H102.5ZM102.5 29.0204V32.0816H103.5V29.0204H102.5ZM102.5 34.1224V37.1837H103.5V34.1224H102.5ZM102.5 39.2245V42.2857H103.5V39.2245H102.5ZM102.5 44.3265V45.8571H103.5V44.3265H102.5ZM103 46.3571C103.553 46.3571 104.091 46.4177 104.607 46.5318L104.823 45.5555C104.237 45.4257 103.626 45.3571 103 45.3571V46.3571ZM106.61 47.3017C107.56 47.8421 108.363 48.5886 108.95 49.4734L109.783 48.9205C109.108 47.9022 108.188 47.0485 107.104 46.4324L106.61 47.3017ZM109.819 51.4153C109.95 51.9227 110.02 52.4534 110.02 53H111.02C111.02 52.368 110.939 51.7532 110.787 51.165L109.819 51.4153ZM110.52 53.5H112V52.5H110.52V53.5ZM113.975 53.5H116.936V52.5H113.975V53.5ZM118.909 53.5H121.871V52.5H118.909V53.5ZM123.845 53.5H126.806V52.5H123.845V53.5ZM128.78 53.5H131.741V52.5H128.78V53.5ZM133.715 53.5H136.676V52.5H133.715V53.5ZM138.65 53.5H141.611V52.5H138.65V53.5ZM143.585 53.5H146.546V52.5H143.585V53.5ZM148.52 53.5H151.481V52.5H148.52V53.5ZM153.455 53.5H156.415V52.5H153.455V53.5ZM158.389 53.5H161.35V52.5H158.389V53.5ZM163.324 53.5H166.285V52.5H163.324V53.5ZM168.259 53.5H171.22V52.5H168.259V53.5ZM173.194 53.5H176.155V52.5H173.194V53.5ZM178.129 53.5H181.09V52.5H178.129V53.5ZM183.064 53.5H186.025V52.5H183.064V53.5ZM187.999 53.5H189.48V52.5H187.999V53.5ZM189.98 53C189.98 52.4534 190.05 51.9227 190.181 51.4153L189.213 51.165C189.061 51.7532 188.98 52.368 188.98 53H189.98ZM191.05 49.4734C191.637 48.5886 192.44 47.8421 193.39 47.3017L192.896 46.4324C191.812 47.0485 190.892 47.9022 190.217 48.9205L191.05 49.4734ZM195.393 46.5318C195.909 46.4177 196.447 46.3571 197 46.3571V45.3571C196.374 45.3571 195.763 45.4257 195.177 45.5555L195.393 46.5318ZM197.5 45.8571V44.3265H196.5V45.8571H197.5ZM197.5 42.2857V39.2245H196.5V42.2857H197.5ZM197.5 37.1837V34.1224H196.5V37.1837H197.5ZM197.5 32.0816V29.0204H196.5V32.0816H197.5ZM197.5 26.9796V23.9184H196.5V26.9796H197.5ZM197.5 21.8776V18.8163H196.5V21.8776H197.5ZM197.5 16.7755V13.7143H196.5V16.7755H197.5ZM197.5 11.6735V10.1429H196.5V11.6735H197.5ZM197 9.64286C196.447 9.64286 195.909 9.58234 195.393 9.46815L195.177 10.4445C195.763 10.5743 196.374 10.6429 197 10.6429V9.64286ZM193.39 8.69835C192.44 8.15786 191.637 7.41135 191.05 6.52661L190.217 7.07947C190.892 8.09779 191.812 8.95148 192.896 9.56764L193.39 8.69835ZM190.181 4.58465C190.05 4.07727 189.98 3.54665 189.98 3H188.98C188.98 3.63204 189.061 4.24676 189.213 4.83504L190.181 4.58465ZM189.48 2.5H188V3.5H189.48V2.5ZM186.026 2.5H183.065V3.5H186.026V2.5ZM181.091 2.5H178.13V3.5H181.091V2.5ZM176.156 2.5H173.195V3.5H176.156V2.5ZM171.221 2.5H168.26V3.5H171.221V2.5ZM166.286 2.5H163.325V3.5H166.286V2.5ZM161.35 2.5H158.389V3.5H161.35V2.5ZM156.415 2.5H153.455V3.5H156.415V2.5ZM151.481 2.5H148.52V3.5H151.481V2.5ZM146.546 2.5H143.585V3.5H146.546V2.5ZM141.611 2.5H138.65V3.5H141.611V2.5ZM136.676 2.5H133.715V3.5H136.676V2.5ZM131.741 2.5H128.78V3.5H131.741V2.5ZM126.806 2.5H123.845V3.5H126.806V2.5ZM121.871 2.5H118.91V3.5H121.871V2.5ZM116.936 2.5H113.975V3.5H116.936V2.5ZM112.001 2.5H110.52V3.5H112.001V2.5ZM110.52 3V2L109.52 3H110.52ZM103 10.1429V9.14286L102 10.1429H103ZM189.48 3H190.48L189.48 2V3ZM197 10.1429H198L197 9.14286V10.1429ZM197 45.8571V46.8571L198 45.8571H197ZM189.48 53V54L190.48 53H189.48ZM110.52 53H109.52L110.52 54V53ZM103 45.8571H102L103 46.8571V45.8571ZM109.52 3C109.52 3.50395 109.456 3.99252 109.335 4.45946L111.271 4.96023C111.434 4.33151 111.52 3.67473 111.52 3H109.52ZM108.533 6.25019C107.991 7.06814 107.247 7.76105 106.363 8.26371L107.351 10.0023C108.502 9.3483 109.48 8.441 110.2 7.3559L108.533 6.25019ZM104.498 8.97999C104.018 9.08634 103.517 9.14286 103 9.14286V11.1429C103.663 11.1429 104.31 11.0703 104.931 10.9326L104.498 8.97999ZM102 10.1429V11.6735H104V10.1429H102ZM102 13.7143V16.7755H104V13.7143H102ZM102 18.8163V21.8776H104V18.8163H102ZM102 23.9184V26.9796H104V23.9184H102ZM102 29.0204V32.0816H104V29.0204H102ZM102 34.1224V37.1837H104V34.1224H102ZM102 39.2245V42.2857H104V39.2245H102ZM102 44.3265V45.8571H104V44.3265H102ZM103 46.8571C103.517 46.8571 104.018 46.9137 104.498 47.02L104.931 45.0674C104.31 44.9297 103.663 44.8571 103 44.8571V46.8571ZM106.363 47.7363C107.247 48.239 107.991 48.9319 108.533 49.7498L110.2 48.6441C109.48 47.559 108.502 46.6517 107.351 45.9977L106.363 47.7363ZM109.335 51.5405C109.456 52.0075 109.52 52.496 109.52 53H111.52C111.52 52.3253 111.434 51.6685 111.271 51.0398L109.335 51.5405ZM110.52 54H112V52H110.52V54ZM113.975 54H116.936V52H113.975V54ZM118.909 54H121.871V52H118.909V54ZM123.845 54H126.806V52H123.845V54ZM128.78 54H131.741V52H128.78V54ZM133.715 54H136.676V52H133.715V54ZM138.65 54H141.611V52H138.65V54ZM143.585 54H146.546V52H143.585V54ZM148.52 54H151.481V52H148.52V54ZM153.455 54H156.415V52H153.455V54ZM158.389 54H161.35V52H158.389V54ZM163.324 54H166.285V52H163.324V54ZM168.259 54H171.22V52H168.259V54ZM173.194 54H176.155V52H173.194V54ZM178.129 54H181.09V52H178.129V54ZM183.064 54H186.025V52H183.064V54ZM187.999 54H189.48V52H187.999V54ZM190.48 53C190.48 52.496 190.544 52.0075 190.665 51.5405L188.729 51.0398C188.566 51.6685 188.48 52.3253 188.48 53H190.48ZM191.467 49.7498C192.009 48.9319 192.753 48.239 193.637 47.7363L192.649 45.9977C191.498 46.6517 190.52 47.559 189.8 48.6441L191.467 49.7498ZM195.502 47.02C195.982 46.9137 196.483 46.8571 197 46.8571V44.8571C196.337 44.8571 195.69 44.9297 195.069 45.0674L195.502 47.02ZM198 45.8571V44.3265H196V45.8571H198ZM198 42.2857V39.2245H196V42.2857H198ZM198 37.1837V34.1224H196V37.1837H198ZM198 32.0816V29.0204H196V32.0816H198ZM198 26.9796V23.9184H196V26.9796H198ZM198 21.8776V18.8163H196V21.8776H198ZM198 16.7755V13.7143H196V16.7755H198ZM198 11.6735V10.1429H196V11.6735H198ZM197 9.14286C196.483 9.14286 195.982 9.08634 195.502 8.97999L195.069 10.9326C195.69 11.0703 196.337 11.1429 197 11.1429V9.14286ZM193.637 8.2637C192.753 7.76105 192.009 7.06814 191.467 6.25018L189.8 7.3559C190.52 8.441 191.498 9.34829 192.649 10.0023L193.637 8.2637ZM190.665 4.45946C190.544 3.99252 190.48 3.50395 190.48 3H188.48C188.48 3.67473 188.566 4.33151 188.729 4.96023L190.665 4.45946ZM189.48 2H188V4H189.48V2ZM186.026 2H183.065V4H186.026V2ZM181.091 2H178.13V4H181.091V2ZM176.156 2H173.195V4H176.156V2ZM171.221 2H168.26V4H171.221V2ZM166.286 2H163.325V4H166.286V2ZM161.35 2H158.389V4H161.35V2ZM156.415 2H153.455V4H156.415V2ZM151.481 2H148.52V4H151.481V2ZM146.546 2H143.585V4H146.546V2ZM141.611 2H138.65V4H141.611V2ZM136.676 2H133.715V4H136.676V2ZM131.741 2H128.78V4H131.741V2ZM126.806 2H123.845V4H126.806V2ZM121.871 2H118.91V4H121.871V2ZM116.936 2H113.975V4H116.936V2ZM112.001 2H110.52V4H112.001V2Z'
          fill='black'
          mask='url(#path-3-inside-1)'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M100 8C95.5817 8 92 4.41828 92 0H8C8 4.41828 4.41828 8 0 8V48C4.41828 48 8 51.5817 8 56H92C92 51.5817 95.5817 48 100 48V8Z'
          fill='#54005B'
          fillOpacity='0.6'
        />
        <path d='M100 8V47.5' stroke='black' strokeDasharray='4 3' />
        <mask id='path-7-inside-2' fill='white'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M97 10.1429C92.8468 10.1429 89.48 6.94489 89.48 3H10.52C10.52 6.94489 7.15318 10.1429 3 10.1429V45.8571C7.15318 45.8571 10.52 49.0551 10.52 53H89.48C89.48 49.0551 92.8468 45.8571 97 45.8571V10.1429Z'
          />
        </mask>
        <path
          d='M89.48 3V2.5L89.98 3H89.48ZM97 10.1429V9.64286L97.5 10.1429H97ZM10.52 3H10.02L10.52 2.5V3ZM3 10.1429H2.5L3 9.64286V10.1429ZM3 45.8571V46.3571L2.5 45.8571H3ZM10.52 53V53.5L10.02 53H10.52ZM89.48 53H89.98L89.48 53.5V53ZM97 45.8571H97.5L97 46.3571V45.8571ZM89.98 3C89.98 3.54665 90.0497 4.07727 90.1809 4.58465L89.2128 4.83504C89.0606 4.24676 88.98 3.63204 88.98 3H89.98ZM91.05 6.52661C91.637 7.41136 92.4395 8.15786 93.3901 8.69835L92.8958 9.56764C91.8122 8.95148 90.8923 8.09779 90.2167 7.07947L91.05 6.52661ZM95.3934 9.46815C95.9088 9.58234 96.4466 9.64286 97 9.64286V10.6429C96.3735 10.6429 95.7632 10.5743 95.1771 10.4445L95.3934 9.46815ZM97.5 10.1429V11.6735H96.5V10.1429H97.5ZM97.5 13.7143V16.7755H96.5V13.7143H97.5ZM97.5 18.8163V21.8776H96.5V18.8163H97.5ZM97.5 23.9184V26.9796H96.5V23.9184H97.5ZM97.5 29.0204V32.0816H96.5V29.0204H97.5ZM97.5 34.1224V37.1837H96.5V34.1224H97.5ZM97.5 39.2245V42.2857H96.5V39.2245H97.5ZM97.5 44.3265V45.8571H96.5V44.3265H97.5ZM97 46.3571C96.4466 46.3571 95.9088 46.4177 95.3934 46.5318L95.1771 45.5555C95.7632 45.4257 96.3735 45.3571 97 45.3571V46.3571ZM93.3901 47.3017C92.4395 47.8421 91.637 48.5886 91.05 49.4734L90.2167 48.9205C90.8923 47.9022 91.8122 47.0485 92.8958 46.4324L93.3901 47.3017ZM90.1809 51.4153C90.0497 51.9227 89.98 52.4534 89.98 53H88.98C88.98 52.368 89.0606 51.7532 89.2128 51.165L90.1809 51.4153ZM89.48 53.5H87.9995V52.5H89.48V53.5ZM86.0255 53.5H83.0645V52.5H86.0255V53.5ZM81.0905 53.5H78.1295V52.5H81.0905V53.5ZM76.1555 53.5H73.1945V52.5H76.1555V53.5ZM71.2205 53.5H68.2595V52.5H71.2205V53.5ZM66.2855 53.5H63.3245V52.5H66.2855V53.5ZM61.3505 53.5H58.3895V52.5H61.3505V53.5ZM56.4155 53.5H53.4545V52.5H56.4155V53.5ZM51.4805 53.5H48.5195V52.5H51.4805V53.5ZM46.5455 53.5H43.5845V52.5H46.5455V53.5ZM41.6105 53.5H38.6495V52.5H41.6105V53.5ZM36.6755 53.5H33.7145V52.5H36.6755V53.5ZM31.7405 53.5H28.7795V52.5H31.7405V53.5ZM26.8055 53.5H23.8445V52.5H26.8055V53.5ZM21.8705 53.5H18.9095V52.5H21.8705V53.5ZM16.9355 53.5H13.9745V52.5H16.9355V53.5ZM12.0005 53.5H10.52V52.5H12.0005V53.5ZM10.02 53C10.02 52.4534 9.95032 51.9227 9.8191 51.4153L10.7872 51.165C10.9394 51.7532 11.02 52.368 11.02 53H10.02ZM8.95002 49.4734C8.36302 48.5886 7.56045 47.8421 6.60994 47.3017L7.10424 46.4324C8.18782 47.0485 9.10767 47.9022 9.7833 48.9205L8.95002 49.4734ZM4.60663 46.5318C4.09118 46.4177 3.55339 46.3571 3 46.3571V45.3571C3.62646 45.3571 4.23678 45.4257 4.82292 45.5555L4.60663 46.5318ZM2.5 45.8571V44.3265H3.5V45.8571H2.5ZM2.5 42.2857V39.2245H3.5V42.2857H2.5ZM2.5 37.1837V34.1224H3.5V37.1837H2.5ZM2.5 32.0816V29.0204H3.5V32.0816H2.5ZM2.5 26.9796V23.9184H3.5V26.9796H2.5ZM2.5 21.8776V18.8163H3.5V21.8776H2.5ZM2.5 16.7755V13.7143H3.5V16.7755H2.5ZM2.5 11.6735V10.1429H3.5V11.6735H2.5ZM3 9.64286C3.55339 9.64286 4.09118 9.58234 4.60663 9.46815L4.82292 10.4445C4.23678 10.5743 3.62646 10.6429 3 10.6429V9.64286ZM6.60994 8.69835C7.56045 8.15786 8.36302 7.41135 8.95002 6.52661L9.7833 7.07947C9.10767 8.09779 8.18782 8.95148 7.10424 9.56764L6.60994 8.69835ZM9.8191 4.58465C9.95032 4.07727 10.02 3.54665 10.02 3H11.02C11.02 3.63204 10.9394 4.24676 10.7872 4.83504L9.8191 4.58465ZM10.52 2.5H12.0005V3.5H10.52V2.5ZM13.9745 2.5H16.9355V3.5H13.9745V2.5ZM18.9095 2.5H21.8705V3.5H18.9095V2.5ZM23.8445 2.5H26.8055V3.5H23.8445V2.5ZM28.7795 2.5H31.7405V3.5H28.7795V2.5ZM33.7145 2.5H36.6755V3.5H33.7145V2.5ZM38.6495 2.5H41.6105V3.5H38.6495V2.5ZM43.5845 2.5H46.5455V3.5H43.5845V2.5ZM48.5195 2.5H51.4805V3.5H48.5195V2.5ZM53.4545 2.5H56.4155V3.5H53.4545V2.5ZM58.3895 2.5H61.3505V3.5H58.3895V2.5ZM63.3245 2.5H66.2855V3.5H63.3245V2.5ZM68.2595 2.5H71.2205V3.5H68.2595V2.5ZM73.1945 2.5H76.1555V3.5H73.1945V2.5ZM78.1295 2.5H81.0905V3.5H78.1295V2.5ZM83.0645 2.5H86.0255V3.5H83.0645V2.5ZM87.9995 2.5H89.48V3.5H87.9995V2.5ZM89.48 3V2L90.48 3H89.48ZM97 10.1429V9.14286L98 10.1429H97ZM10.52 3H9.52L10.52 2V3ZM3 10.1429H2L3 9.14286V10.1429ZM3 45.8571V46.8571L2 45.8571H3ZM10.52 53V54L9.52 53H10.52ZM89.48 53H90.48L89.48 54V53ZM97 45.8571H98L97 46.8571V45.8571ZM90.48 3C90.48 3.50395 90.5442 3.99252 90.665 4.45946L88.7287 4.96023C88.5661 4.33151 88.48 3.67473 88.48 3H90.48ZM91.4666 6.25019C92.0093 7.06814 92.7532 7.76105 93.6372 8.26371L92.6486 10.0023C91.4985 9.3483 90.52 8.441 89.8001 7.3559L91.4666 6.25019ZM95.5015 8.97999C95.9816 9.08634 96.4832 9.14286 97 9.14286V11.1429C96.337 11.1429 95.6904 11.0703 95.0689 10.9326L95.5015 8.97999ZM98 10.1429V11.6735H96V10.1429H98ZM98 13.7143V16.7755H96V13.7143H98ZM98 18.8163V21.8776H96V18.8163H98ZM98 23.9184V26.9796H96V23.9184H98ZM98 29.0204V32.0816H96V29.0204H98ZM98 34.1224V37.1837H96V34.1224H98ZM98 39.2245V42.2857H96V39.2245H98ZM98 44.3265V45.8571H96V44.3265H98ZM97 46.8571C96.4832 46.8571 95.9816 46.9137 95.5015 47.02L95.0689 45.0674C95.6904 44.9297 96.337 44.8571 97 44.8571V46.8571ZM93.6372 47.7363C92.7532 48.239 92.0093 48.9319 91.4666 49.7498L89.8001 48.6441C90.52 47.559 91.4985 46.6517 92.6486 45.9977L93.6372 47.7363ZM90.665 51.5405C90.5442 52.0075 90.48 52.496 90.48 53H88.48C88.48 52.3253 88.5661 51.6685 88.7287 51.0398L90.665 51.5405ZM89.48 54H87.9995V52H89.48V54ZM86.0255 54H83.0645V52H86.0255V54ZM81.0905 54H78.1295V52H81.0905V54ZM76.1555 54H73.1945V52H76.1555V54ZM71.2205 54H68.2595V52H71.2205V54ZM66.2855 54H63.3245V52H66.2855V54ZM61.3505 54H58.3895V52H61.3505V54ZM56.4155 54H53.4545V52H56.4155V54ZM51.4805 54H48.5195V52H51.4805V54ZM46.5455 54H43.5845V52H46.5455V54ZM41.6105 54H38.6495V52H41.6105V54ZM36.6755 54H33.7145V52H36.6755V54ZM31.7405 54H28.7795V52H31.7405V54ZM26.8055 54H23.8445V52H26.8055V54ZM21.8705 54H18.9095V52H21.8705V54ZM16.9355 54H13.9745V52H16.9355V54ZM12.0005 54H10.52V52H12.0005V54ZM9.52 53C9.52 52.496 9.45579 52.0075 9.33503 51.5405L11.2713 51.0398C11.4339 51.6685 11.52 52.3253 11.52 53H9.52ZM8.53339 49.7498C7.99069 48.9319 7.24677 48.239 6.36279 47.7363L7.3514 45.9977C8.50151 46.6517 9.48 47.559 10.1999 48.6441L8.53339 49.7498ZM4.49849 47.02C4.01839 46.9137 3.51685 46.8571 3 46.8571V44.8571C3.663 44.8571 4.30957 44.9297 4.93106 45.0674L4.49849 47.02ZM2 45.8571V44.3265H4V45.8571H2ZM2 42.2857V39.2245H4V42.2857H2ZM2 37.1837V34.1224H4V37.1837H2ZM2 32.0816V29.0204H4V32.0816H2ZM2 26.9796V23.9184H4V26.9796H2ZM2 21.8776V18.8163H4V21.8776H2ZM2 16.7755V13.7143H4V16.7755H2ZM2 11.6735V10.1429H4V11.6735H2ZM3 9.14286C3.51685 9.14286 4.01839 9.08634 4.49849 8.97999L4.93107 10.9326C4.30957 11.0703 3.663 11.1429 3 11.1429V9.14286ZM6.36279 8.2637C7.24677 7.76105 7.9907 7.06814 8.53339 6.25018L10.1999 7.3559C9.48 8.441 8.50151 9.34829 7.3514 10.0023L6.36279 8.2637ZM9.33503 4.45946C9.45579 3.99252 9.52 3.50395 9.52 3H11.52C11.52 3.67473 11.4339 4.33151 11.2713 4.96023L9.33503 4.45946ZM10.52 2H12.0005V4H10.52V2ZM13.9745 2H16.9355V4H13.9745V2ZM18.9095 2H21.8705V4H18.9095V2ZM23.8445 2H26.8055V4H23.8445V2ZM28.7795 2H31.7405V4H28.7795V2ZM33.7145 2H36.6755V4H33.7145V2ZM38.6495 2H41.6105V4H38.6495V2ZM43.5845 2H46.5455V4H43.5845V2ZM48.5195 2H51.4805V4H48.5195V2ZM53.4545 2H56.4155V4H53.4545V2ZM58.3895 2H61.3505V4H58.3895V2ZM63.3245 2H66.2855V4H63.3245V2ZM68.2595 2H71.2205V4H68.2595V2ZM73.1945 2H76.1555V4H73.1945V2ZM78.1295 2H81.0905V4H78.1295V2ZM83.0645 2H86.0255V4H83.0645V2ZM87.9995 2H89.48V4H87.9995V2Z'
          fill='black'
          mask='url(#path-7-inside-2)'
        />
      </svg>
      <H
        as='h4'
        fontSize='1.5rem'
        fontWeight='100'
        letterSpacing='1px'
        color={Colors.white}
        textTransform='capitalize'
        absPosition={{ x: 'top,10%', y: 'left,10%' }}
      >
        price:
      </H>
      <H
        as='h4'
        fontWeight='100'
        fontSize='1.5rem'
        letterSpacing='1px'
        color={Colors.white}
        absPosition={{ x: 'top,40%', y: 'left,20%' }}
      >
        {`${price}$`}
      </H>
      <H
        as='h4'
        fontSize='1rem'
        fontWeight='100'
        textAlign='center'
        color={Colors.white}
        textTransform='capitalize'
        transforms='translateX(50%)'
        absPosition={{ x: 'top,15%', y: 'right,25%' }}
      >
        Zone | Row | Column
      </H>
      <H
        as='h4'
        fontWeight='100'
        fontSize='1.4rem'
        textAlign='center'
        color={Colors.white}
        textTransform='capitalize'
        transforms='translateX(50%)'
        absPosition={{ x: 'top,45%', y: 'right,25%' }}
      >
        {code}
      </H>
    </Div>
  );
};

export default ReservedTicket;
