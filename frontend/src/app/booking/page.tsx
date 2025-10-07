"use client"; // Must be first line

import React, { Suspense } from "react";
import BookingContent from "./BookingContent";

const BookingPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading booking page...</div>}>
      <BookingContent />
    </Suspense>
  );
};

export default BookingPage;
