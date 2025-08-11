import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {
  Trash2,
  CircleCheck as CheckCircle,
  Circle as XCircle,
  Clock,
} from 'lucide-react-native';
import { DetectionService } from '@/services/DetectionService';
import { useFocusEffect } from 'expo-router';

interface HistoryItem {
  id: string;
  imageUri: string;
  result: {
    isCauliflower: boolean;
    confidence: number;
    timestamp: string;
  };
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    try {
      const historyData = await DetectionService.getHistory();
      setHistory(historyData);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const clearHistory = async () => {
    try {
      await DetectionService.clearHistory();
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await DetectionService.deleteHistoryItem(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <Image source={{ uri: item.imageUri }} style={styles.historyImage} />

      <View style={styles.historyContent}>
        <View style={styles.resultRow}>
          {item.result.isCauliflower ? (
            <CheckCircle size={20} color="#22C55E" strokeWidth={2} />
          ) : (
            <XCircle size={20} color="#EF4444" strokeWidth={2} />
          )}
          <Text
            style={[
              styles.resultText,
              { color: item.result.isCauliflower ? '#22C55E' : '#EF4444' },
            ]}
          >
            {item.result.isCauliflower
              ? 'Cauliflower Detected'
              : 'Not Cauliflower'}
          </Text>
        </View>

        <Text style={styles.confidenceText}>
          Confidence: {(item.result.confidence * 100).toFixed(1)}%
        </Text>

        <View style={styles.timestampRow}>
          <Clock size={14} color="#9CA3AF" strokeWidth={2} />
          <Text style={styles.timestampText}>
            {formatTimestamp(item.result.timestamp)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Trash2 size={20} color="#EF4444" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detection History</Text>
        {history.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Clock size={64} color="#D1D5DB" strokeWidth={1.5} />
          <Text style={styles.emptyTitle}>No detections yet</Text>
          <Text style={styles.emptyText}>
            Start detecting cauliflower to see your history here
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#22C55E"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#111827',
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  clearButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#EF4444',
  },
  listContainer: {
    padding: 24,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  historyContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  confidenceText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#374151',
    marginTop: 24,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
