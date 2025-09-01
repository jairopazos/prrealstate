import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as usersActions from "../../users/actions";
import * as selectors from "../../users/selectors";
import "./AdvertiserReview.css";

// Componente de estrellas (1..5)
function Stars({ value = 0, onChange, readOnly = false }) {
    const [hover, setHover] = useState(0);
    const shown = hover || value;

    const handleKey = (e, n) => {
        if (readOnly) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange?.(n);
        }
        if (e.key === "ArrowRight") onChange?.(Math.min(5, (value || 0) + 1));
        if (e.key === "ArrowLeft") onChange?.(Math.max(1, (value || 0) - 1));
    };

    return (
        <div className="stars" role="radiogroup" aria-label="Valoración">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    type="button"
                    className={`star ${shown >= n ? "active" : ""} ${readOnly ? "ro" : ""}`}
                    onMouseEnter={() => !readOnly && setHover(n)}
                    onMouseLeave={() => !readOnly && setHover(0)}
                    onClick={() => !readOnly && onChange?.(n)}
                    onKeyDown={(e) => handleKey(e, n)}
                    role="radio"
                    aria-checked={value === n}
                    aria-label={`${n} estrella${n > 1 ? "s" : ""}`}
                    tabIndex={readOnly ? -1 : 0}
                >
                    {shown >= n ? "★" : "☆"}
                </button>
            ))}
        </div>
    );
}

const AdvertiserReviews = () => {
    const { userId } = useParams();                 // /users/:userId/reviews
    const dispatch = useDispatch();
    const user = useSelector(selectors.getUser);
    const userEmail = user?.email || null;
    const [selfReviewBlocked, setSelfReviewBlocked] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [sending, setSending] = useState(false);
    const advertiserIdNum = Number(userId);
    const isSelfReview = user?.id === advertiserIdNum; // ← es tu propio anuncio


    // Cargar reseñas
    useEffect(() => {
        setLoading(true);
        dispatch(
            usersActions.fetchUserReviews(
                userId,
                (data) => { setReviews(data || []); setErr(""); setLoading(false); },
                (e) => { setErr(e?.message || "No se pudieron cargar las reseñas."); setLoading(false); }
            )
        );
    }, [userId, dispatch]);

    const canSend = !!userEmail && rating > 0 && comment.trim().length >= 10;

    const handleAddReview = () => {
        if (!canSend || sending) return;
        if (isSelfReview) {
            setSelfReviewBlocked(true); // muestra aviso
            return;
        }
        setSending(true);
        setSelfReviewBlocked(false); // resetea aviso previo

        dispatch(
            usersActions.createUserReview(
                Number(userId),                 // asegúrate de pasar número válido
                { rating, comment },
                (saved) => {
                    setReviews(prev => [saved, ...prev]);
                    setComment("");
                    setRating(0);
                    setSending(false);
                },
                (e) => {
                    // Si el backend mandó 403 por auto-reseña, lo marcamos
                    if (e?.status === 403) {
                        setSelfReviewBlocked(true);
                    } else {
                        setErr(e?.message || "No se pudo enviar la reseña.");
                    }
                    setSending(false);
                }
            )
        );
    };


    const prettyDate = (d) => {
        // backend manda LocalDateTime → “2025-08-30T12:34:56”
        if (!d) return "";
        const asDate = new Date(d);
        // Fallback si el parse falla
        return isNaN(asDate) ? String(d).replace("T", " ").slice(0, 16) : asDate.toLocaleDateString();
    };

    return (
        <div className="reviews-container">
            <h2>Reseñas del anunciante</h2>




            {loading ? (
                <p>Cargando…</p>
            ) : err ? (
                <p className="error">{err}</p>
            ) : reviews.length === 0 ? (
                <p>No hay reseñas todavía.</p>
            ) : (
                <ul className="review-list">
                    {reviews.map((r) => (
                        <li className="review-card" key={r.id}>
                            <div className="review-card__header">
                                <div className="review-card__author">{r.authorName ?? "Usuario"}</div>
                                <Stars value={r.rating} readOnly />
                            </div>
                            <p className="review-card__comment">{r.comment}</p>
                            <div className="review-card__meta">
                                <span>{prettyDate(r.createdAt)}</span>
                                {r.verified && <span className="badge verified">✔︎ Transacción verificada</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <hr />

            {userEmail ? (
                <div className="review-form">
                    <h3>Tu reseña</h3>

                    {selfReviewBlocked && (
                        <p className="review-hint">No puedes reseñar tu propio anuncio.</p>
                    )}

                    <Stars value={rating} onChange={setRating} />
                    <textarea
                        className="property-opinion-edit"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Cuenta tu experiencia (mín. 10 caracteres)…"
                        rows={4}
                    />

                    <button
                        type="button"
                        className="review-button"
                        disabled={!canSend || sending}
                        onClick={handleAddReview}
                    >
                        {sending ? "Enviando…" : "Enviar reseña"}
                    </button>

                    {/* Pista de validación (opcional) */}
                    {!canSend && !sending && !selfReviewBlocked && (
                        <p className="review-hint">
                            {rating <= 0
                                ? "Selecciona una valoración en estrellas."
                                : comment.trim().length < 10
                                    ? `Escribe ${10 - comment.trim().length} caracteres más.`
                                    : null}
                        </p>
                    )}
                </div>
            ) : (
                <p className="review-hint">Inicia sesión para dejar una reseña</p>
            )}

        </div>
    );
};

export default AdvertiserReviews;
