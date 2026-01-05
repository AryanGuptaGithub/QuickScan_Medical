// components/emails/AppointmentReminder.tsx
import React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Heading
} from '@react-email/components';

export default function AppointmentReminderEmail(data: any) {
  return (
    <Html>
      <Preview>Reminder: Your QuickScan Medical Appointment Tomorrow</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Heading style={styles.heading}>Appointment Reminder</Heading>
          </Section>
          
          <Section style={styles.content}>
            <Text style={styles.text}>
              This is a friendly reminder about your appointment tomorrow.
            </Text>
            
            <Text style={styles.details}>
              <strong>Booking ID:</strong> {data.bookingId}<br />
              <strong>Service:</strong> {data.serviceName}<br />
              <strong>Time:</strong> {data.timeSlot}<br />
              <strong>Location:</strong> {data.labName}
            </Text>
            
            <Link 
              href="https://quickscan.vercel.app/dashboard" 
              style={styles.button}
            >
              View Details
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  main: {
    backgroundColor: '#f0f9ff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
    border: '1px solid #e0f2fe',
    borderRadius: '8px',
  },
  header: {
    backgroundColor: '#0ea5e9',
    color: '#ffffff',
    padding: '30px',
    textAlign: 'center' as const,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
  },
  content: {
    padding: '30px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#475569',
    marginBottom: '20px',
  },
  details: {
    backgroundColor: '#f8fafc',
    padding: '15px',
    borderRadius: '6px',
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#334155',
    marginBottom: '25px',
  },
  button: {
    backgroundColor: '#0ea5e9',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
  },
};