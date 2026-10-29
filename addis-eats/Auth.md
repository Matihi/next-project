#### Protected Routes

###### /checkout

- layers\
  middleware: check session and redirect to login page if it does not exist.\
  page: check session and redirect to login page if it does not exist.\
  server action: check session and redirect to login page if it does not exist.

###### /orders

- layers\
  middleware: check session and redirect to login page if it does not exist.\
   page: check session and redirect to login page if it does not exist.\
   server action: check session and inform user if it does not exist and check if user is authorized before allowing cancellation of order.
