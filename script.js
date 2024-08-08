document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const modal = document.getElementById('booking-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const confirmBookingBtn = document.getElementById('confirm-booking');
    const ticketModal = document.getElementById('ticket-modal');
    const closeTicketModal = document.getElementsByClassName('close-ticket')[0];
    const cancelBookingBtn = document.getElementById('cancel-booking'); // New: Cancellation button
    const classSelect = document.getElementById('class');
    let selectedFlight = null;
    let selectedSeats = [];
    let selectedClass = null;

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Fetch form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const departure = document.getElementById('departure').value;
        const destination = document.getElementById('destination').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const price = document.getElementById('price').value;
        const seatPreference = document.getElementById('seat-preference').value;
        selectedClass = classSelect.value;

        // Validate inputs (incomplete validation for demonstration)
        if (!name || !phone || !departure || !destination || !date || !selectedClass) {
            alert('Please fill in all required fields.');
            return;
        }

        // Display flight results (for future enhancement)
        displayFlights();
    });

    // Function to display available flights (simulated data)
    function displayFlights() {
        const results = document.getElementById('results');
        results.innerHTML = '';

        // Simulated flight data
        const flights = [
            { id: 1, from: 'New York City', to: 'London', date: '2024-07-01', time: '10:00 AM', priceEconomy: 500, priceBusiness: 1200 },
            { id: 2, from: 'India', to: 'USA', date: '2024-07-01', time: '1:00 PM', priceEconomy: 1600, priceBusiness: 3000 }
        ];

        flights.forEach(flight => {
            const flightDiv = document.createElement('div');
            flightDiv.className = 'flight';
            flightDiv.innerHTML = `
                <p>Flight from ${flight.from} to ${flight.to}</p>
                <p>Date: ${flight.date}</p>
                <p>Time: ${flight.time}</p>
                <p>Economy Price: $${flight.priceEconomy}</p>
                <p>Business Price: $${flight.priceBusiness}</p>
                <button onclick="selectFlight(${flight.id})">Book Now</button>
            `;
            results.appendChild(flightDiv);
        });
    }

    // Function to select flight
    window.selectFlight = function(flightId) {
        selectedFlight = flightId;
        selectedSeats = [];
        showModal();
    };

    // Function to show modal and seat selection
    function showModal() {
        modal.style.display = 'block';
        const seatMap = document.getElementById('seat-map');
        seatMap.innerHTML = '';

        // Simulated seat data
        const seats = [
            { id: '1A', status: 'available' },
            { id: '1B', status: 'booked' },
            { id: '1C', status: 'available' },
            { id: '1D', status: 'under-booking' },
            { id: '2A', status: 'available' },
            { id: '2B', status: 'available' },
            { id: '2C', status: 'available' },
            { id: '2D', status: 'available' }
        ];

        seats.forEach(seat => {
            const seatDiv = document.createElement('div');
            seatDiv.className = 'seat ${seat.status}';
            seatDiv.innerText = seat.id;
            seatDiv.addEventListener('click', () => selectSeat(seat.id, seat.status));
            seatMap.appendChild(seatDiv);
        });
    }

    // Function to select seat
    function selectSeat(seatId, status) {
        if (status === 'booked') {
            return;
        }

        const seatIndex = selectedSeats.indexOf(seatId);
        if (seatIndex > -1) {
            selectedSeats.splice(seatIndex, 1);
            document.querySelector(seat.selected).classList.remove('selected');
        } else {
            selectedSeats.push(seatId);
            document.querySelector(seat.available).classList.add('selected');
        }
    }

    // Function to close modal
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    // Function to close ticket modal
    closeTicketModal.onclick = function() {
        ticketModal.style.display = 'none';
    };

    // Function to confirm booking
    confirmBookingBtn.onclick = function() {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat.');
            return;
        }

        const paymentForm = document.getElementById('payment-form');
        const cardNumber = paymentForm['card-number'].value;
        const expiryDate = paymentForm['expiry-date'].value;
        const cvv = paymentForm['cvv'].value;
        const cardHolder = paymentForm['card-holder'].value;

        if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
            alert('Please fill in all payment details.');
            return;
        }

        // Simulate booking confirmation
        alert('Booking confirmed!');

        // Close modal
        modal.style.display = 'none';

        // Display ticket details
        displayTicketDetails();
    };

    // Function to display ticket details
    function displayTicketDetails() {
        ticketModal.style.display = 'block';
        const ticketDetails = document.getElementById('ticket-details');
        ticketDetails.innerHTML = `
            <h3>Ticket Details</h3>
            <p>Flight ID: ${selectedFlight}</p>
            <p>Class: ${selectedClass}</p>
            <p>Seats: ${selectedSeats.join(', ')}</p>
            <p>Passenger Name: ${document.getElementById('name').value}</p>
            <p>Phone Number: ${document.getElementById('phone').value}</p>
            <p>Departure City: ${document.getElementById('departure').value}</p>
            <p>Destination City: ${document.getElementById('destination').value}</p>
            <p>Departure Date: ${document.getElementById('date').value}</p>
            <p>Preferred Time: ${document.getElementById('time').value}</p>
            <p>Seat Preference: ${document.getElementById('seat-preference').value}</p>
        `;
        
        // New: Add event listener for Cancel Booking button
        cancelBookingBtn.onclick = function() {
            cancelBooking();
        };
    }

    // Function to cancel booking
    function cancelBooking() {
        // Logic to cancel booking (e.g., reset selected seats, display message, etc.)
        alert('Booking cancelled!');
        selectedFlight = null;
        selectedSeats = [];
        selectedClass = null;
        ticketModal.style.display = 'none';
    }
});