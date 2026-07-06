import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EmptyState from './EmptyState';
import { Star, Sparkles, MessageCircle, Check, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function ReviewsCenter() {
  const { activeBusinessData, replyToGoogleReview, setActiveTab } = useApp();
  const [filter, setFilter] = useState('all'); // all, pending, positive, negative
  const [generatingDraftId, setGeneratingDraftId] = useState(null);
  const [editDraftTexts, setEditDraftTexts] = useState({});

  const reviews = activeBusinessData.reviews;

  const filteredReviews = reviews.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !r.replied;
    if (filter === 'positive') return r.rating >= 4;
    if (filter === 'negative') return r.rating <= 3;
    return true;
  });

  const generateAIDraft = (rev) => {
    setGeneratingDraftId(rev.id);
    setTimeout(() => {
      // Simulate draft reply text
      let draftText = '';
      if (rev.rating >= 4) {
        draftText = `Hi ${rev.author}! Thank you so much for the 5-star rating! We are delighted that you enjoyed your experience and our service. We look forward to welcoming you back soon. - Rahul`;
      } else {
        draftText = `Dear ${rev.author}, thank you for your feedback. We are sincerely sorry that the wait times during peak brunch hours didn't meet your expectations. We are actively refining our queues and booking slots. We would love to make this right; please reach out to us at support@dailygrind.com. - Rahul`;
      }
      setEditDraftTexts(prev => ({
        ...prev,
        [rev.id]: draftText
      }));
      setGeneratingDraftId(null);
    }, 800);
  };

  const handlePublishReply = (revId) => {
    const text = editDraftTexts[revId];
    if (!text) return;
    replyToGoogleReview(revId, text);
    // Clear draft text
    setEditDraftTexts(prev => {
      const copy = { ...prev };
      delete copy[revId];
      return copy;
    });
  };

  const getSentimentBadge = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <span className="badge badge-emerald">Positive</span>;
      case 'negative': return <span className="badge badge-rose">Negative</span>;
      default: return <span className="badge badge-warning">Neutral</span>;
    }
  };

  if (reviews.length === 0) {
    return (
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)', width: '100%' }}>
        <EmptyState
          title="No Google Reviews Found"
          description="Connect your Google Business Profile to retrieve customer ratings, feedback, and auto-draft SEO-optimized replies."
          icon={Star}
          tip="Replying to Google reviews within 24 hours improves your search visibility on Google Maps by 25%."
          actionText="Connect Google Maps"
          onAction={() => setActiveTab('integrations')}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Google Reviews Command</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Aggregated Google Reviews listing. AI detects sentiment, highlights urgent issues, and drafts replies.</p>
        </div>

        {/* Filter controls */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'pending', 'positive', 'negative'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontSize: '0.75rem',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: filter === f ? 'var(--color-purple)' : 'var(--bg-card)',
                color: filter === f ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: filter === f ? 600 : 500,
                textTransform: 'uppercase'
              }}
            >
              {f === 'pending' ? 'Unreplied' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Review Feed list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredReviews.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No reviews match this criteria.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="glass-card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderLeft: rev.urgent && !rev.replied ? '4px solid var(--color-rose)' : '1px solid var(--border-color)'
            }}>
              {/* Header profile details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={rev.avatar} alt={rev.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{rev.author}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Google Maps review • {rev.date}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {rev.urgent && !rev.replied && (
                    <span className="badge badge-rose" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertTriangle size={10} /> Urgent Action
                    </span>
                  )}
                  {getSentimentBadge(rev.sentiment)}
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={14} fill={idx < rev.rating ? '#F59E0B' : 'transparent'} color="#F59E0B" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review content body */}
              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                "{rev.content}"
              </p>

              {/* Published Response */}
              {rev.replied ? (
                <div style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(16, 185, 129, 0.04)',
                  border: '1px solid rgba(16, 185, 129, 0.12)',
                  fontSize: '0.8125rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-emerald)', fontWeight: 600, marginBottom: '4px' }}>
                    <Check size={14} />
                    <span>Your Response published</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{rev.replyText}"
                  </p>
                </div>
              ) : (
                /* Response Input / Draft actions */
                <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {editDraftTexts[rev.id] ? (
                    <div style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(108,76,241,0.25)',
                      backgroundColor: 'rgba(108,76,241,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={12} color="var(--color-purple)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-purple)', textTransform: 'uppercase' }}>
                          AI Generated Draft Response
                        </span>
                      </div>
                      <textarea
                        className="form-input"
                        rows={3}
                        value={editDraftTexts[rev.id]}
                        onChange={(e) => setEditDraftTexts(prev => ({ ...prev, [rev.id]: e.target.value }))}
                        style={{ fontSize: '0.8125rem', lineHeight: '1.4' }}
                      />
                      <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
                        <button
                          onClick={() => setEditDraftTexts(prev => {
                            const copy = { ...prev };
                            delete copy[rev.id];
                            return copy;
                          })}
                          className="btn btn-ghost"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        >
                          Discard
                        </button>
                        <button
                          onClick={() => handlePublishReply(rev.id)}
                          className="btn btn-primary"
                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                        >
                          Publish Response
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => generateAIDraft(rev)}
                      disabled={generatingDraftId === rev.id}
                      className="btn btn-secondary"
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: '0.75rem',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {generatingDraftId === rev.id ? (
                        <>Drafting...</>
                      ) : (
                        <>
                          <Sparkles size={12} color="var(--color-purple)" /> One-click AI Reply Draft
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
