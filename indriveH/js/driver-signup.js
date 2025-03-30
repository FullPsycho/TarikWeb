document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('driver-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const fields = [
            'fullname', 'email', 'phone',
            'car-make', 'car-model', 'car-year',
            'license', 'insurance'
        ];

        // Collect form data
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input.type === 'file') {
                formData.append(field, input.files[0]);
            } else {
                formData.append(field, input.value);
            }
        });

        try {
            // Simulate API call
            console.log('Submitting driver application...');
            // Add your API endpoint here
            // const response = await fetch('/api/driver-signup', {
            //     method: 'POST',
            //     body: formData
            // });

            alert('Application submitted successfully!');
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting application. Please try again.');
        }
    });
});
