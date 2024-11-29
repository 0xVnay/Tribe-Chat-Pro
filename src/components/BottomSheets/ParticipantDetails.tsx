import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type ParticipantDetailsProps = {
  participant: TParticipant;
};

export const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  participant,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {participant.avatarUrl ? (
          <Image
            source={{ uri: participant.avatarUrl }}
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatar, styles.placeholderAvatar]}>
            <Text style={styles.avatarText}>
              {participant.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.headerText}>
          <Text style={styles.name}>{participant.name}</Text>
          {participant.jobTitle && (
            <Text style={styles.jobTitle}>{participant.jobTitle}</Text>
          )}
        </View>
      </View>

      {participant.email && (
        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{participant.email}</Text>
        </View>
      )}

      {participant.bio && (
        <View style={styles.infoSection}>
          <Text style={styles.label}>Bio</Text>
          <Text style={styles.value}>{participant.bio}</Text>
        </View>
      )}

      <View style={styles.infoSection}>
        <Text style={styles.label}>Member since</Text>
        <Text style={styles.value}>
          {new Date(participant.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  placeholderAvatar: {
    backgroundColor: "#E1E1E1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    color: "#666",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    color: "#666",
  },
  infoSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
});
