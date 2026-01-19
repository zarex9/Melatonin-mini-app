import React, { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'milestone';
  timestamp: number;
}

interface NotificationBellProps {
  notifications?: Notification[];
  onNotificationDismiss?: (id: string) => void;
  className?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ 
  notifications = [], 
  onNotificationDismiss,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications]);

  const handleDismiss = (id: string) => {
    onNotificationDismiss?.(id);
  };

  const getIconColor = (type?: string) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'milestone':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        title={unreadCount > 0 ? `${unreadCount} notifications` : 'No notifications'}
      >
        {/* Bell SVG Icon */}
        <svg
          className="w-6 h-6 text-slate-700 dark:text-slate-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Notifications
            </h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
              No notifications yet
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex justify-between items-start gap-2"
                >
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${getIconColor(notif.type)}`}>
                      {notif.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {new Date(notif.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDismiss(notif.id)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs font-medium"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {notifications.length > 0 && (
            <div className="p-3 border-t border-slate-200 dark:border-slate-700 text-center">
              <button
                onClick={() => {
                  notifications.forEach(n => handleDismiss(n.id));
                  setIsOpen(false);
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
