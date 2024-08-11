class DashboardComponent {
    constructor() {
      this.messageElement = document.getElementById('demo');
      this.message = '';
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
        this.messageElement.innerHTML = "Geolocation is not supported by this browser.";
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
      this.messageElement.innerHTML = this.message;
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
          this.messageElement.innerHTML = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          this.messageElement.innerHTML = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.messageElement.innerHTML = "The request to get user location timed out.";
          break;
        default:
          this.messageElement.innerHTML = "An unknown error occurred.";
          break;
      }
    }
  }
  
  const dashboard = new DashboardComponent();
  document.getElementById('submitBtn').addEventListener('click', () => dashboard.getLocation());
  
