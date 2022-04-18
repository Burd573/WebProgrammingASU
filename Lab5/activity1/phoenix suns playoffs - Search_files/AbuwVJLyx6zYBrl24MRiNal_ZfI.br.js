var SvgIcon;(function(n){var t;(function(){function n(n,t){for(var i,r,f="data-loaded",o=".actIconSvg."+n+":not(["+f+"])",e=document.querySelectorAll(o),u=0;u<e.length;u++)i=e[u],i.innerHTML=t,i.setAttribute(f,"1"),r=i.querySelector("svg"),r&&(r.setAttribute("role","presentation"),r.setAttribute("focusable","false"))}n("actShareSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M12.391 17.57c1.187-0.516 2.419-0.906 3.695-1.172C17.361 16.133 18.666 16 20 16v6l11-11L20 0v6 c-1.292 0-2.534 0.167-3.726 0.499c-1.194 0.334-2.308 0.805-3.344 1.414c-1.037 0.61-1.979 1.339-2.828 2.188 c-0.85 0.849-1.579 1.792-2.188 2.828c-0.609 1.037-1.081 2.152-1.414 3.344C6.166 17.467 6 18.709 6 20v2 c0.916-0.947 1.914-1.794 2.993-2.539C10.071 18.716 11.204 18.086 12.391 17.57z M9.18 14.789 c0.422-0.869 0.938-1.677 1.547-2.422c0.609-0.744 1.302-1.408 2.078-1.992c0.775-0.584 1.617-1.063 2.523-1.438 c0.594-0.25 1.157-0.439 1.688-0.57c0.531-0.129 1.06-0.22 1.586-0.273c0.525-0.052 1.064-0.08 1.617-0.086 C20.771 8.003 21.364 8 22 8V4.828L28.172 11L22 17.172V14h-2c-2.104 0-4.151 0.297-6.141 0.89 c-1.99 0.594-3.859 1.475-5.609 2.641C8.448 16.573 8.758 15.659 9.18 14.789z M22 26H2V8H0v20h24v-6l-2 2V26z"/><\/svg>');n("actEmailSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M0 6h32v20H0V6zm2 18h28V10.12l-14 7-14-7V24zM29.77 8H2.23L16 14.9 29.77 8z"/><\/svg>');n("actExpSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="4" cy="16" r="2"/><circle cx="16" cy="16" r="2"/><circle cx="28" cy="16" r="2"/><\/svg>');n("actFacebookMessengerSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32"><path d="M27.296 4.382C24.399 1.672 20.405 0 16 0C11.595 0 7.601 1.672 4.704 4.382C1.808 7.089-0.001 10.855 0 15 c0.001 4.239 1.899 8.16 5 10.843V31c0 0.348 0.179 0.668 0.474 0.851c0.296 0.183 0.662 0.199 0.973 0.044l5.071-2.535 C12.941 29.722 14.413 30 16 30c4.405 0 8.399-1.672 11.296-4.382C30.192 22.911 32.001 19.144 32 15 C32.001 10.855 30.192 7.089 27.296 4.382z M17.9 19.7c0 0.1-0.1 0.1-0.2 0.1c0 0-0.2-0.1-0.3-0.4c-0.2-0.2-1.2-1.2-1.5-1.5 c-0.3-0.4-1.9-2-2-2.1c-0.1-0.1-0.1-0.1-0.2-0.2c0-0.1-0.1-0.1-0.2-0.1S6 19.6 5.9 19.6c0.9-0.9 7.7-8.2 8.2-8.7l0.1-0.1 c0 0 0 0 0.1 0c0.1 0 0.2 0.1 0.2 0.1l0.1 0.1c0.6 0.6 2.8 3 3.4 3.6c0.1 0.1 0.1 0.1 0.2 0.2c0.1 0.1 0.2 0.1 0.3 0.1 s0.3 0 0.4-0.1c1.1-0.6 7.1-3.9 7.2-3.9C24.8 12.4 18 19.6 17.9 19.7z"/><\/svg>');n("actFacebookSvgIcon",'<svg version="1.1" x="0px" y="0px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><path d="M30.914 0.141c0.213 0.094 0.401 0.222 0.563 0.383c0.161 0.162 0.289 0.349 0.383 0.563 C31.953 1.3 32 1.526 32 1.766v28.469c0 0.24-0.047 0.466-0.141 0.68c-0.094 0.214-0.222 0.401-0.383 0.563 c-0.162 0.162-0.349 0.289-0.563 0.383C30.7 31.953 30.474 32 30.234 32h-8.156V19.609h4.156l0.625-4.828h-4.781v-3.078 c0-0.854 0.182-1.461 0.547-1.82c0.364-0.359 0.979-0.539 1.844-0.539h2.563V5.031c-0.615-0.083-1.234-0.138-1.859-0.164 c-0.625-0.026-1.25-0.039-1.875-0.039c-0.99 0-1.867 0.151-2.633 0.453c-0.766 0.302-1.414 0.732-1.945 1.289 c-0.531 0.558-0.935 1.229-1.211 2.016c-0.276 0.787-0.414 1.664-0.414 2.633v3.563h-4.172v4.828h4.172V32H1.766 c-0.24 0-0.466-0.047-0.68-0.141c-0.214-0.094-0.401-0.221-0.563-0.383c-0.162-0.161-0.289-0.349-0.383-0.563 C0.047 30.701 0 30.474 0 30.234V1.766C0 1.526 0.047 1.3 0.141 1.086c0.094-0.213 0.221-0.401 0.383-0.563 c0.161-0.161 0.349-0.289 0.563-0.383C1.299 0.047 1.526 0 1.766 0h28.469C30.474 0 30.7 0.047 30.914 0.141z" /><\/svg>');n("actFeedbackSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M0 2.17h32V24H11.42L4 31.83V24H0V2.17zm30 20V4H2v18.17h4v5l4.58-5H30z"/><\/svg>');n("actHalseyTrackSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M22.45 20l3.75 12L16 24.93 5.9 32l3.7-12L0 12.03h12.06L16 0l3.98 12.03H32L22.45 20zm.1 7.06l-2.4-7.75c1.05-.84 5.25-4.3 6.3-5.3h-7.9l-2.53-7.6c-.42 1.3-2.08 6.6-2.5 7.6H5.58c1.06 1 5.25 4.46 6.3 5.3L9.5 27.07 16 22.5c1.1.8 5.47 3.82 6.57 4.6z"/><\/svg>');n("actHalseyUnTrackSvgIcon",'<svg class="actUntrack" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M22.45 20l3.75 12L16 24.93 5.9 32l3.7-12L0 12.03h12.06L16 0l3.98 12.03H32L22.45 20z"/><\/svg>');n("actPinterestSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 1C7.72 1 1 7.72 1 16c0 6.1 3.64 11.34 8.87 13.7-.1-.77.1-2.2.33-3.2l1.96-8.27s-.5-.97-.5-2.4c0-2.26 1.32-3.94 2.94-3.94 1.38 0 2.05 1 2.05 2.23 0 1.4-.88 3.47-1.34 5.4-.33 1.6.86 2.92 2.4 2.92 2.9 0 4.86-3.7 4.86-8.1 0-3.32-2.24-5.8-6.32-5.8-4.6 0-7.46 3.43-7.46 7.27 0 1.32.4 2.25 1 2.97.28.34.32.47.22.85-.1.27-.25.94-.3 1.2-.1.4-.44.53-.78.4-2.13-.88-3.1-3.2-3.1-5.8C5.77 11.15 9.4 6 16.6 6c5.8 0 9.6 4.2 9.6 8.7 0 5.96-3.3 10.4-8.18 10.4-1.64 0-3.18-.88-3.7-1.9l-1.08 4.2c-.26.93-.54 2-1.12 2.8-.06.1-.14.17-.2.24 1.28.36 2.65.56 4.06.56 8.28 0 15-6.72 15-15S24.28 1 16 1z"/><\/svg>');n("actPrintSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M15 6c.14 0 .26.03.4.08.1.05.22.12.3.2s.17.2.22.33c.05.15.08.27.08.4v7h-4v2H4v-2H0V7c0-.14.03-.27.08-.4s.12-.22.2-.3.2-.17.33-.22C.76 6.03.88 6 1 6h3V0h8v6h3zm0 1H1v6h3v-3h8v3h3V7zM5 6h6V1H5v5zm6 5H5v4h6v-4z"/><circle cx="2.5" cy="8.5" r=".5"/><\/svg>');n("actSkypeSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M30.9 18.96c.2-.96.3-1.95.3-2.96C31.2 7.6 24.4.8 16 .8c-1 0-2 .1-2.96.3C11.8.4 10.34 0 8.8 0 3.94 0 0 3.94 0 8.8c0 1.54.4 3 1.1 4.24C.9 14 .8 15 .8 16c0 8.4 6.8 15.2 15.2 15.2 1 0 2-.1 2.96-.3 1.25.7 2.7 1.1 4.24 1.1 4.86 0 8.8-3.94 8.8-8.8 0-1.54-.4-2.98-1.1-4.24zm-7.48 2.72c-.2.57-.5 1.07-.85 1.5s-.78.8-1.27 1.12-1.02.56-1.6.75-1.15.34-1.78.43-1.24.15-1.86.15c-.62 0-1.27-.05-1.96-.15s-1.34-.25-1.98-.46-1.24-.5-1.8-.88-1.04-.82-1.4-1.37c-.2-.28-.35-.56-.47-.87s-.18-.63-.18-.96c0-.53.18-.96.54-1.27s.8-.47 1.3-.47c.4 0 .7.1.94.25s.47.38.67.64l.64.8s.48.6.8.84.7.47 1.17.63 1.05.25 1.76.25c.37 0 .75-.04 1.16-.14s.78-.26 1.13-.46.62-.48.85-.8.33-.7.33-1.13c0-.3-.05-.53-.15-.74s-.24-.4-.42-.55-.37-.27-.6-.38-.46-.2-.7-.25l-2.38-.6-2.37-.6c-.68-.18-1.3-.4-1.86-.67s-1.03-.6-1.42-1-.7-.87-.9-1.43-.3-1.2-.3-1.95c0-1.03.2-1.9.64-2.6s1-1.27 1.7-1.7 1.47-.76 2.35-.96 1.76-.3 2.63-.3c.38 0 .82.05 1.32.12s1.03.2 1.56.34 1.06.34 1.58.58.98.5 1.38.82.74.67 1 1.07.36.83.36 1.32c0 .27-.05.5-.15.7s-.25.4-.43.52-.38.24-.6.3-.47.1-.72.1c-.33 0-.6-.06-.82-.2s-.42-.3-.6-.5l-.62-.66s-.48-.45-.78-.65-.68-.38-1.12-.5-.98-.2-1.63-.2c-.35 0-.7.02-1.06.1s-.68.2-.96.36-.5.4-.7.66-.26.63-.26 1.04c0 .45.17.8.5 1.07s.73.5 1.26.66 1.12.32 1.8.44 1.36.27 2.06.43 1.4.37 2.07.6 1.28.6 1.8 1 .96.92 1.28 1.54.48 1.4.48 2.3c0 .73-.1 1.37-.3 1.94z"/><\/svg>');n("actSmsSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M0,1v22h4v7.694L11.422,23H32V1H0z M10,19c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2 C12,18.105,11.105,19,10,19z M10,9C8.895,9,8,8.105,8,7c0-1.105,0.895-2,2-2s2,0.895,2,2C12,8.105,11.105,9,10,9z M17,13h-4v-2h4V13 z M18.617,20.235l-0.893-1.785C20.237,17.387,22,14.899,22,12c0-2.899-1.763-5.387-4.275-6.45l0.893-1.785 C21.783,5.161,24,8.324,24,12S21.783,18.839,18.617,20.235z"/><\/svg>');n("actTwitterSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 6.08c-.44.65-.93 1.27-1.48 1.83-.56.6-1.16 1.1-1.8 1.6l.02.5v.5c0 1.3-.13 2.6-.4 3.9s-.7 2.5-1.23 3.7c-.7 1.8-1.7 3.3-2.8 4.7-1.1 1.4-2.4 2.6-3.9 3.5-1.4 1-3 1.7-4.8 2.2s-3.5.8-5.4.8c-1.8 0-3.5-.22-5.2-.72-1.7-.5-3.3-1.2-4.8-2.2.5.1 1.1.1 1.6.1 1.5 0 3-.22 4.4-.7 1.4-.5 2.67-1.2 3.84-2.1-.7 0-1.36-.12-2-.34-.63-.22-1.2-.53-1.76-.93-.5-.4-1-.9-1.4-1.44-.4-.5-.7-1.12-.9-1.8l.6.1h.6c.6 0 1.17-.1 1.7-.2-.73-.13-1.44-.4-2.1-.8-.62-.4-1.2-.9-1.64-1.44-.5-.55-.88-1.2-1.1-1.9-.3-.7-.4-1.5-.4-2.25v-.1c.9.54 1.9.8 3 .85-.5-.3-.9-.7-1.27-1.1s-.67-.87-.92-1.3-.4-1-.5-1.5-.2-1.1-.2-1.6c0-.6.1-1.2.2-1.7.16-.6.4-1.1.7-1.6C3.1 5.2 4 6.16 5 7c1.02.8 2.1 1.5 3.25 2.1 1.15.58 2.36 1.04 3.62 1.38 1.25.34 2.54.54 3.87.6-.07-.24-.1-.48-.14-.74-.02-.25-.04-.5-.04-.76 0-.9.17-1.76.5-2.55s.82-1.47 1.42-2.07 1.3-1.06 2.08-1.4 1.7-.53 2.6-.53c.9 0 1.78.18 2.6.54s1.57.87 2.2 1.54c.73-.1 1.45-.3 2.14-.6.7-.2 1.36-.6 2-1-.23.8-.6 1.5-1.1 2.1-.5.7-1.08 1.2-1.77 1.6 1.32-.1 2.57-.5 3.77-1z"/><\/svg>');n("actWhatsAppSvgIcon",'<svg viewBox="0 0 32 32"><path d="M16 0C7.16 0 0 7.16 0 16c.02 4.26 2 7.75 2.8 8.98L0 32l7.6-2.4c1.08.65 4.33 2.4 8.4 2.4 8.84 0 16-7.16 16-16S24.84 0 16 0zm9.9 25.9C23.36 28.44 19.87 30 16 30c-2.1 0-4.06-.58-5.47-1.16-.7-.3-1.27-.6-1.66-.8l-.44-.27-.1-.06H8.3l-.4-.25L3 29l2.08-4.2-.34-.5-.03-.02C4.47 23.9 2 20.18 2 16c0-3.87 1.57-7.36 4.1-9.9C8.64 3.57 12.13 2 16 2s7.36 1.56 9.9 4.1C28.44 8.64 30 12.13 30 16s-1.57 7.36-4.1 9.9z"/><path d="M24.04 22.8c-1.06 1.14-3.32 1.67-4.38 1.37-1.07-.3-4.6-1.22-6.9-3.37s-4.17-4.4-4.93-6.07-.72-2.66-.68-3.12c.04-.44.28-2.6 1.73-3.53 0 0 .48-.3.73-.3h1.44s.38.06.55.46l1.44 3.4c.1.22.32.75-.05 1.22-.38.48-1.16 1.37-1.16 1.37s-.3.28-.04.7c.26.45 1.2 1.9 2.4 3s2.7 1.9 3.47 2.13c.74.25.9-.08 1.2-.45l1.16-1.5s.3-.43.9-.16c.6.3 3.54 1.7 3.54 1.7s.35.06.37.46c.02.4.27 1.6-.8 2.74z"/><\/svg>');n("actLinkedInSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M1.6 3.2v25.6c0 .884.716 1.6 1.6 1.6h25.6c.884 0 1.6-.716 1.6-1.6v-25.6c0-.884-.716-1.6-1.6-1.6h-25.6c-.884 0-1.6.716-1.6 1.6zm9.067 22.4h-4.267v-12.824h4.267v12.824zm-2.13-14.662c-1.326 0-2.4-1.077-2.4-2.405 0-1.328 1.074-2.405 2.4-2.405s2.4 1.077 2.4 2.405c0 1.328-1.074 2.405-2.4 2.405zm17.063 14.662h-4v-7.997s-.233-1.603-2-1.603c-3 0-2.533 2.386-2.533 2.386v7.214h-4.267v-12.824h4.267v1.493c.533-1.469 3.733-1.493 3.733-1.493s4.8-.076 4.8 4.809v8.015z"/><\/svg>');n("actOneNoteSvgIcon",'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M2 4.797l16-2.703v27.812l-16-2.703v-22.406zm4.453 16.172l1.594.078v-7.047l.031-.172.031-.156.078.086.094.086.164.344.18.344 3.656 6.75 2.125.125v-11.095l-1.984.125v7.047l.016.227.047.227h-.031c-.625-1.239-1.276-2.455-1.953-3.648s-1.349-2.398-2.016-3.617l-2.032.077v10.219zm23.547-9.297c0 .136-.016.224-.047.266-.031.041-.12.062-.265.062h-1.688v14.203l-.039.25-.109.258-.172.203c-.068.057-.144.086-.227.086h-8.453v-3h6v-1h-6v-2h6v-1h-6v-2h6v-1h-6v-2h6v-1h-6v-2h6v-1h-6v-2h6v-1h-6v-3h8.453c.208 0 .352.089.43.266.078.177.117.354.117.531v1.203h1.688c.145 0 .234.018.266.055.03.036.046.127.046.273v4.344zm-.406 1.328c.135 0 .237.065.305.195.067.131.101.253.101.367v3.875c0 .115-.034.237-.102.367-.068.131-.169.196-.304.196h-.594v-5h.594zm0 6c.135 0 .237.065.305.195.067.131.101.253.101.367v3.875c0 .115-.034.237-.102.367-.068.131-.169.196-.304.196h-.594v-5h.594z"/><\/svg>');n("actWeiboSvgIcon",'<svg viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200.390625" height="200"><path d="M1012.49 451.553v0.159c-6.697 20.66-28.861 31.99-49.449 25.288a39.352 39.352 0 0 1-25.287-49.582l-0.067-0.031c20.536-63.6 7.516-136.156-40.315-189.363-47.892-53.212-118.502-73.554-183.731-59.659-21.222 4.537-42.133-9.047-46.638-30.3-4.506-21.253 9.021-42.194 30.239-46.73 91.709-19.563 191.114 8.98 258.467 83.881 67.36 74.839 85.515 176.85 56.781 266.337z" p-id="1019"><\/path><path d="M740.429 304.348v-0.03c-18.217 3.973-36.178-7.732-40.06-26.01-3.947-18.31 7.763-36.373 25.98-40.254 44.692-9.548 93.143 4.322 125.885 40.781 32.866 36.496 41.631 86.17 27.607 129.772a33.833 33.833 0 0 1-42.562 21.847c-17.782-5.76-27.484-24.914-21.724-42.69h-0.062c6.887-21.346 2.565-45.635-13.46-63.473-16.026-17.818-39.752-24.546-61.604-19.943z m30.05 192.184c-14.46-4.352-24.352-7.326-16.774-26.352 16.333-41.313 18.027-76.964 0.317-102.385-33.31-47.734-124.451-45.133-228.838-1.28 0-0.061-32.799 14.367-24.412-11.704 16.056-51.774 13.645-95.186-11.361-120.192-56.658-56.878-207.304 2.12-336.477 131.64C56.187 463.32 0 566.14 0 655.1 0 825.18 217.503 928.594 430.28 928.594c278.917 0 464.527-162.504 464.527-291.59 0-77.936-65.546-122.193-124.329-140.472zM430.842 867.62c-169.774 16.84-316.35-60.155-327.368-171.96-11.049-111.74 117.72-216.034 287.488-232.873 169.805-16.84 316.355 60.16 327.368 171.904 11.018 111.866-117.683 216.09-287.488 232.929z" p-id="1020"><\/path><path d="M447.805 548.859c-80.783-21.09-172.119 19.287-207.206 90.65-35.743 72.862-1.188 153.681 80.44 180.1 84.578 27.357 184.233-14.525 218.88-93.148 34.181-76.81-8.478-155.94-92.114-177.602zM386.12 734.792c-16.43 26.29-51.584 37.806-78.065 25.661-26.107-11.889-33.833-42.44-17.403-68.045 16.215-25.538 50.207-36.869 76.498-25.856 26.604 11.392 35.087 41.687 18.97 68.24z"><\/path><\/svg>');n("actQzoneSvgIcon",'<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M504.768 24.224c-5.216 2.144-19.872 17.728-19.872 21.28 0 1.184-22.944 49.888-51.072 108.064S381.568 262.56 380.16 266.592c-1.184 3.776-3.328 8.288-4.256 9.696-1.184 1.408-7.808 14.176-14.88 28.384-7.552 15.616-15.616 28.608-20.096 32.16-10.88 9.216-3.552 8.288-221.312 32.64C21.248 380.576 10.368 382.24 4.48 387.68c-4.256 3.776-5.92 17.504-2.848 25.536 0.96 2.112 43.264 42.336 94.112 89.376 160.768 148.48 150.368 138.08 150.368 149.184 0 5.44-3.296 25.056-7.104 43.968-4.032 18.912-12.992 66.208-20.32 105.216s-15.84 83.712-18.912 99.296c-16.32 83.232-16.544 85.6-8.032 94.592 8.032 8.512 17.248 7.552 41.6-4.736 22.688-11.584 24.832-12.768 69.504-39.008 16.32-9.472 37.6-21.76 47.296-27.2s27.648-16.064 39.712-23.392 22.464-13.248 23.168-13.248c0.48 0 7.808-4.256 16.064-9.472s15.84-9.44 16.8-9.44c0.96 0 9.472-4.736 18.912-10.624 22.464-13.952 41.856-21.056 52.96-18.912 4.736 0.96 16.064 5.44 25.056 10.4 23.648 12.544 172.608 98.368 218.944 126.016 39.488 23.648 51.072 28.128 64.544 24.576 8.992-2.144 11.584-15.136 8.512-40.896-1.408-11.584-3.552-24.608-4.736-29.088-1.888-7.552-9.696-49.408-28.608-154.4-8.736-49.888-8.736-50.848 10.88-58.176 27.2-10.176 39.968-19.136 35.008-24.128-1.664-1.664-16.8 0.256-48.224 5.92-58.4 10.624-70.464 12.288-132.16 17.984-70.208 6.624-135.008 8.032-221.568 4.96-67.616-2.368-148-8.288-152.512-11.104-3.552-2.368-1.888-9.696 3.552-14.432 2.848-2.592 38.784-28.384 79.68-57.44 128.16-90.784 211.392-150.848 218.24-157.248 11.808-11.104 10.88-11.584-38.304-17.984-77.792-9.92-98.112-11.584-224.864-17.504-42.336-1.888-80.64-4.256-85.12-4.96-46.336-7.808 189.856-29.088 289.632-26.016 65.504 1.888 142.592 7.328 187.968 13.248 42.336 5.664 44.928 6.144 44.928 10.88 0 3.776-4.48 7.104-104.032 75.648-40.896 28.384-84.416 58.4-96.704 66.912-12.064 8.512-24.576 17.248-27.424 19.136-13.248 8.992-57.696 39.968-69.984 48.928-7.808 5.664-13.952 11.808-13.952 13.728 0 4.48 11.584 7.328 47.296 11.584 94.816 11.104 271.2 17.248 279.008 9.472 1.664-1.664 1.408-6.848-1.184-17.728-1.888-8.288-3.552-16.096-3.552-17.248 0-3.328 40.192-43.52 95.744-95.52 146.816-137.6 150.144-140.928 150.144-151.808 0-9.472-7.808-17.984-19.392-20.8-5.664-1.408-39.488-5.216-75.2-8.736-35.712-3.328-75.2-7.104-87.488-8.288-12.288-1.408-38.304-4.032-57.92-6.144-74.944-7.552-97.888-10.4-103.328-12.992-10.4-4.736-20.096-24.128-91.744-185.376C537.824 44.8 533.344 35.584 526.24 29.216c-5.888-5.44-15.104-7.552-21.504-4.96z"><\/path><\/svg>')})(t=n.OnDemand||(n.OnDemand={}))})(SvgIcon||(SvgIcon={}))