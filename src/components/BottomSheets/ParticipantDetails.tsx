import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Badge, Card, Text } from "../common";
import { format } from "date-fns";

type ParticipantDetailsProps = {
  participant: TParticipant;
};

export const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  participant,
}) => {
  return (
    <Card variant="flat" padding={0}>
      <View style={styles.header}>
        <Avatar
          url={participant.avatarUrl}
          name={participant.name}
          size="lg"
          border
        />
        <Text variant="heading">{participant.name}</Text>
        {participant.jobTitle && (
          <Badge variant="subtle" label={participant.jobTitle} />
        )}
      </View>
      <View style={styles.content}>
        {participant.email && (
          <InfoItem label="Email" value={participant.email} />
        )}
        {participant.bio && <InfoItem label="Bio" value={participant.bio} />}
        <InfoItem
          label="Member since"
          value={format(participant.createdAt, "PP")}
        />
      </View>
    </Card>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <View style={styles.infoItem}>
    <Text variant="label" color="secondary">
      {label}
    </Text>
    <Text variant="body">{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    alignItems: "center",
    gap: 12,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  infoItem: {
    gap: 4,
  },
});
