import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { theshtify } from "../lib/theshtify.js";

beforeEach(() => {
  document.body.innerHTML = "";
  document.querySelectorAll(".Thesharsol-notifyer").forEach((el) => el.remove());
});

afterEach(() => {
  document.querySelectorAll(".Thesharsol-notifyer").forEach((el) => el.remove());
});

describe("basic notification creation", () => {
  it("should create a notification element in the DOM", () => {
    theshtify({ message: "Hello", type: "success" });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(1);
  });

  it("should display the correct message", () => {
    theshtify({ message: "Test message", type: "info" });
    const notif = document.querySelector(".Thesharsol-notifyer");
    expect(notif.innerHTML).toContain("Test message");
  });

  it("should display the title when provided", () => {
    theshtify({ message: "Body text", type: "success", title: "My Title" });
    const notif = document.querySelector(".Thesharsol-notifyer");
    expect(notif.innerHTML).toContain("My Title");
  });

  it("should create multiple stacked notifications", () => {
    theshtify({ message: "First", type: "success" });
    theshtify({ message: "Second", type: "danger" });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(2);
  });

  it("should support all built-in types", () => {
    const types = ["success", "danger", "info", "warning"];
    types.forEach((type) => {
      theshtify({ message: `Type ${type}`, type });
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(4);
  });
});

describe("config validation", () => {
  it("should still create a notification without a message (uses default)", () => {
    theshtify({ type: "success" });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(1);
  });

  it("should still create a notification without a type (uses default)", () => {
    theshtify({ message: "Hello" });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(1);
  });

  it("should not create a notification with an invalid type", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    theshtify({ message: "Hello", type: "invalid" });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(0);
    spy.mockRestore();
  });

  it("should accept a valid duration", () => {
    theshtify({
      message: "Hello",
      type: "success",
      config: { duration: 3000 },
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(1);
  });

  it("should reject a non-boolean bordered value", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    theshtify({
      message: "Hello",
      type: "success",
      config: { bordered: "yes" },
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(0);
    spy.mockRestore();
  });

  it("should reject a non-boolean progress value", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    theshtify({
      message: "Hello",
      type: "success",
      config: { progress: "yes" },
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(0);
    spy.mockRestore();
  });

  it("should reject a non-number radius", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    theshtify({
      message: "Hello",
      type: "success",
      config: { radius: "big" },
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(0);
    spy.mockRestore();
  });
});

describe("positioning", () => {
  it("should accept valid x_align values", () => {
    ["left", "right", "middle"].forEach((x_align) => {
      theshtify({ message: "Hello", type: "success", config: { x_align } });
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(3);
  });

  it("should accept valid y_align values", () => {
    ["top", "bottom", "middle"].forEach((y_align) => {
      theshtify({ message: "Hello", type: "success", config: { y_align } });
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(3);
  });

  it("should reject invalid x_align", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    theshtify({
      message: "Hello",
      type: "success",
      config: { x_align: "center" },
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(0);
    spy.mockRestore();
  });

  it("should reject invalid y_align", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    theshtify({
      message: "Hello",
      type: "success",
      config: { y_align: "center" },
    });
    const notifs = document.querySelectorAll(".Thesharsol-notifyer");
    expect(notifs.length).toBe(0);
    spy.mockRestore();
  });
});

describe("features", () => {
  it("should show close button when closer is true", () => {
    theshtify({
      message: "Hello",
      type: "success",
      config: { closer: true },
    });
    const closeBtn = document.querySelector(".close-icon");
    expect(closeBtn).not.toBeNull();
  });

  it("should show progress bar when progress is true", () => {
    theshtify({
      message: "Hello",
      type: "success",
      config: { progress: true },
    });
    const progress = document.querySelector(".progress");
    expect(progress).not.toBeNull();
  });

  it("should apply custom CSS class via main_box_classes", () => {
    theshtify({
      message: "Hello",
      type: "success",
      config: { main_box_classes: "my-custom-class" },
    });
    const notif = document.querySelector(".Thesharsol-notifyer");
    expect(notif.classList.contains("my-custom-class")).toBe(true);
  });

  it("should set the callback and trigger on click", () => {
    const fn = vi.fn();
    theshtify({
      message: "Hello",
      type: "success",
      callback: fn,
    });
    const notif = document.querySelector(".Thesharsol-notifyer");
    notif.click();
    expect(fn).toHaveBeenCalled();
  });

  it("should apply border when bordered is true", () => {
    theshtify({
      message: "Hello",
      type: "success",
      config: { bordered: true },
    });
    const notif = document.querySelector(".Thesharsol-notifyer");
    expect(notif.style.border).not.toBe("");
  });

  it("should apply custom border radius", () => {
    theshtify({
      message: "Hello",
      type: "success",
      config: { radius: 20 },
    });
    const notif = document.querySelector(".Thesharsol-notifyer");
    expect(notif.style.borderRadius).toBe("20px");
  });

  it("should use responsive width with max-width", () => {
    theshtify({ message: "Hello", type: "success" });
    const notif = document.querySelector(".Thesharsol-notifyer");
    expect(notif.style.width).toBe("90%");
    expect(notif.style.maxWidth).toBe("300px");
  });
});
