// components/emails/BookingCancellation.tsx
import React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Section,
  Heading,
  Hr
} from '@react-email/components';

export default function BookingCancellationEmail(data: any) {
  return (
    <Html>
      <Preview>Your QuickScan Medical Appointment has been Cancelled</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Heading style={styles.heading}>Appointment Cancelled</Heading>
          </Section>
          
          <Section style={styles.content}>
            <Text style={styles.text}>
              Your appointment <strong>{data.bookingId}</strong> has been cancelled.
            </Text>
            
            <Text style={styles.text}>
              If you didn&apos;t request this cancellation or need to reschedule, 
              please contact us immediately.
            </Text>
            
            <Link 
              href="https://quickscan.vercel.app/booking" 
              style={styles.button}
            >
              Book New Appointment
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  main: {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    backgroundColor: '#ffffff',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
  },
  header: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    padding: '40px 30px',
    textAlign: 'center' as const,
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0',
  },
  content: {
    padding: '40px 30px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4b5563',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '20px',
  },
};