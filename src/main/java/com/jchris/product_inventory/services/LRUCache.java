package com.jchris.product_inventory.services;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

import org.springframework.stereotype.Service;


@Service
public class LRUCache<K, V> {
    private class CacheItem {
        private V value;

        public CacheItem(V value) {
            this.value = value;
        }

        public V getValue() {
            return value;
        }
    }

    private Map<K, CacheItem> lookup = new HashMap<>();
    private LinkedList<CacheItem> lastAccessed = new LinkedList<>();
    private final int CACHE_SIZE;

    public LRUCache() {
        this(100);
    }

    public LRUCache(int size) {
        CACHE_SIZE = size;
    }

    public void add(K key, V value) {
        // check to see if key already exist in the cache
        // if so delete it
        if (lookup.containsKey(key)) {
            lastAccessed.remove(lookup.get(key));
            lookup.remove(key);
        }

        // if cache is full, remove oldest entry to make space
        if (lastAccessed.size() >= CACHE_SIZE) {
            lookup.remove(lastAccessed.getLast());
            lastAccessed.removeLast();
        }

        lastAccessed.addFirst(new CacheItem(value));
        lookup.put(key, lastAccessed.getFirst());
    }

    public V get(K key) {
        // check to see if key already exist in the cache
        if (lookup.containsKey(key)) {
            lastAccessed.remove(lookup.get(key));
            lastAccessed.addFirst(new CacheItem(lookup.get(key).getValue()));

            return ((CacheItem)lookup.get(key)).getValue();
        }
        return null;
    }

    public void evict(K key) {
        if (lookup.containsKey(key)) {
            lastAccessed.remove(lookup.get(key));
            lookup.remove(key);
        }
    }

    @Override public String toString() {
        StringBuilder s = new StringBuilder();
        for (int i = 0; i < lastAccessed.size(); i++)
            s.append(lastAccessed.get(i).getValue() + " --> ");
        s.append("null");
        return s.toString();
    }
}
