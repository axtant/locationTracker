class DashboardComponent {
  constructor() {
    this.message = '';

    // Define your office premises boundaries (latitude and longitude)
    this.officeBounds = {
      north: 19.17729,
      south: 19.17304,
      east: 72.99136,
      west: 72.98842
    };
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.showPosition(position),
        (error) => this.showError(error)
      );
    } else {
      this.message = "Geolocation is not supported by this browser.";
    }
  }

  showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.message = `Latitude: ${latitude}<br>Longitude: ${longitude}`;

    if (this.validateLocation(latitude, longitude)) {
      this.message += "<br>You are within the office premises.";
    } else {
      this.message += "<br>You are not within the office premises.";
    }
  }

  validateLocation(lat, long) {
    return (
      lat <= this.officeBounds.north &&
      lat >= this.officeBounds.south &&
      long <= this.officeBounds.east &&
      long >= this.officeBounds.west
    );
  }

  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.message = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        this.message = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        this.message = "The request to get user location timed out.";
        break;
      default:
        this.message = "An unknown error occurred.";
        break;
    }
  }
}

// Create an instance of the component and call getLocation to initiate geolocation
const dashboard = new DashboardComponent();
dashboard.getLocation();
