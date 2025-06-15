import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventItem = React.memo(({ item, onPress, colors }) => {
  return (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => onPress(item)}
    >
      <View style={styles.eventTime}>
        <Text style={{ color: colors.text, fontFamily: 'maven_medium' }}>{item.hour || '--:--'}</Text>
        <Text style={{ color: colors.text + '88', fontFamily: 'maven_regular' }}>{item.duration || '1h'}</Text>
      </View>
      
      <View style={[styles.eventContent, { borderLeftColor: colors.primary }]}>
        <Text style={[styles.eventTitle, { color: colors.text }]}>{item.title}</Text>
        {item.location ? (
          <Text style={[styles.eventLocation, { color: colors.text + 'CC' }]}>
            {item.location}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    height: 80
  },
  eventTime: {
    marginRight: 16,
    minWidth: 56,
    alignItems: 'flex-start'
  },
  eventContent: {
    flex: 1,
    borderLeftWidth: 3,
    paddingLeft: 12
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'maven_medium',
    marginBottom: 4
  },
  eventLocation: {
    fontSize: 14,
    fontFamily: 'maven_regular'
  }
});

export default EventItem;